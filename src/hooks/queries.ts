import { useEffect } from "react";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { Dayjs } from "dayjs";

import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { EndpointResponse, GetShopResult, HttpClient } from "../HttpClient";
import { ReservationData, ShopData } from "../models";

export function useAuthStatus(httpClient: HttpClient) {
  const queryKey = ["authStatus"];
  const queryClient = useQueryClient();

  const authStatus = useQuery({
    queryKey,
    queryFn: () => httpClient.getAuthStatus(),
    staleTime: Infinity
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  return { ...authStatus, invalidate };
}

export function useCustomer() {
  const { authStatus, getCustomer } = useBackendAccessContext();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;
  const customer = useQuery({
    queryKey: ["customer", authStatus],
    queryFn: () => getCustomer(customerId),
    enabled: !isNaN(customerId),
    staleTime: Infinity
  });

  return customer;
}

export function useAreas() {
  const { getAreas } = useBackendAccessContext();
  const areas = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
    staleTime: Infinity
  });

  return areas;
}

export function useGenres() {
  const { getGenres } = useBackendAccessContext();
  const genres = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: Infinity
  });

  return genres;
}

export function useShops() {
  const { authStatus, getShops } = useBackendAccessContext();

  const shops = useInfiniteQuery({
    queryKey: ["shops", authStatus],
    queryFn: async ({ pageParam }) => await getShops(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined;
    },
    staleTime: Infinity
  });

  useEffect(() => {
    if (shops.hasNextPage) {
      shops.fetchNextPage();
    }
  }, [shops]);

  return shops;
}

export function useShop(shopId: number, shop?: ShopData) {
  const { getShop } = useBackendAccessContext();

  const data: GetShopResult | undefined = shop
    ? { status: 200, data: shop }
    : undefined;

  return useQuery({
    queryKey: ["shop", shopId],
    queryFn: async () => {
      if (isNaN(shopId)) {
        return { status: 404 } as GetShopResult;
      } else {
        return await getShop(shopId);
      }
    },
    enabled: !data,
    initialData: data,
    staleTime: Infinity
  });
}

export function useFavorites() {
  const { authStatus, getFavorites } = useBackendAccessContext();
  const queryKey = ["favorites", authStatus];
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;

  const favorites = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getFavorites(customerId, pageParam),
    initialPageParam: 1,
    enabled: !isNaN(customerId),
    getNextPageParam: (lastPage) => {
      if (
        lastPage.success &&
        lastPage.data.meta.current_page < lastPage.data.meta.last_page
      ) {
        return lastPage.data.meta.current_page + 1;
      } else {
        return undefined;
      }
    },
    staleTime: Infinity
  });

  useEffect(() => {
    if (favorites.hasNextPage) {
      favorites.fetchNextPage();
    }
  }, [favorites]);

  return favorites;
}

export function useFavoriteMutation() {
  const queryClient = useQueryClient();
  const { authStatus, addFavorite, removeFavorite } = useBackendAccessContext();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;
  const onSuccess = () =>
    [["shops"], ["favorites"]].forEach((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    );

  const addition = useMutation({
    mutationFn: (shopId: number) => addFavorite(customerId, shopId),
    onSuccess
  });

  const removal = useMutation({
    mutationFn: (shopId: number) => removeFavorite(customerId, shopId),
    onSuccess
  });

  return { add: addition.mutate, remove: removal.mutate };
}

export function useReservations() {
  const queryClient = useQueryClient();
  const { authStatus, getReservations, deleteReservation } =
    useBackendAccessContext();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;

  const reservations = useQuery({
    queryKey: ["reservations", customerId],
    queryFn: () => getReservations(customerId),
    enabled: !isNaN(customerId),
    staleTime: Infinity
  });

  const cancel = useMutation({
    mutationFn: (reservation: ReservationData) => {
      return deleteReservation(customerId, reservation.id);
    },
    onSuccess: async (data) => {
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
      }
    }
  });

  return { ...reservations, cancel: cancel.mutate };
}

export function useShopReservations(shopId: number) {
  const queryClient = useQueryClient();
  const { authStatus, getReservations, postReservation } =
    useBackendAccessContext();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;

  const enabled = authStatus.status === "customer" && !isNaN(shopId);
  const empty: EndpointResponse<ReservationData[]> = {
    success: true,
    data: []
  };
  const reservations = useQuery({
    queryKey: ["reservations", authStatus, shopId],
    queryFn: async () => {
      if (enabled) {
        return await getReservations(customerId, shopId);
      } else {
        return empty;
      }
    },
    enabled,
    initialData: empty,
    staleTime: Infinity
  });

  async function mutationFn(args: {
    reservedAt: Dayjs;
    numberOfGuests: number;
  }) {
    if (authStatus.status !== "customer" || isNaN(shopId)) {
      return null;
    }

    return await postReservation(
      authStatus.id,
      shopId,
      args.reservedAt,
      args.numberOfGuests
    );
  }

  const mutation = useMutation({
    mutationFn,
    onSuccess: async (data) => {
      if (data) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
      }
    }
  });

  return { ...reservations, reserve: mutation.mutate };
}
