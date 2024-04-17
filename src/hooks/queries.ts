import { useEffect } from "react";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { Dayjs } from "dayjs";

import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { EndpointResponse, GetShopResult } from "../HttpClient";
import { AuthStatus, ReservationData, ShopData } from "../models";

export function useCustomer(customerId: number) {
  const { getCustomer } = useBackendAccessContext();
  const customer = useQuery({
    queryKey: ["customer", customerId],
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

export function useShops(authStatus: AuthStatus) {
  const { getShops } = useBackendAccessContext();

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

export function useFavorites(customerId: number) {
  const { getFavorites } = useBackendAccessContext();
  const queryKey = ["favorites", customerId];

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

export function useFavoriteMutation(customerId?: number) {
  const queryClient = useQueryClient();
  const { addFavorite, removeFavorite } = useBackendAccessContext();
  const onSuccess = () =>
    [["shops"], ["favorites"]].forEach((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    );

  const addition = useMutation({
    mutationFn: async (shopId: number) => {
      if (customerId) {
        await addFavorite(customerId, shopId);
      }
    },
    onSuccess
  });

  const removal = useMutation({
    mutationFn: async (shopId: number) => {
      if (customerId) {
        await removeFavorite(customerId, shopId);
      }
    },
    onSuccess
  });

  return { add: addition.mutate, remove: removal.mutate };
}

export function useReservations(customerId: number) {
  const queryClient = useQueryClient();
  const { getReservations, putReservation, deleteReservation } =
    useBackendAccessContext();

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

  const update = useMutation({
    mutationFn: (reservation: ReservationData) => {
      return putReservation(customerId, reservation);
    },
    onSuccess: async (data) => {
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: ["reservations"] });
      }
    }
  });

  return { ...reservations, update: update.mutate, cancel: cancel.mutate };
}

export function useShopReservations(customerId: number, shopId: number) {
  const queryClient = useQueryClient();
  const { getReservations, postReservation } = useBackendAccessContext();

  const enabled = !isNaN(customerId) && !isNaN(shopId);

  const empty: EndpointResponse<ReservationData[]> = {
    success: true,
    data: []
  };

  const reservations = useQuery({
    queryKey: ["reservations", customerId, shopId],
    queryFn: async () => {
      if (enabled) {
        return await getReservations(customerId, shopId);
      } else {
        return empty;
      }
    },
    enabled,
    initialData: empty
  });

  async function mutationFn(args: {
    reservedAt: Dayjs;
    numberOfGuests: number;
  }) {
    if (enabled) {
      return await postReservation(
        customerId,
        shopId,
        args.reservedAt,
        args.numberOfGuests
      );
    } else {
      return null;
    }
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

export function useOwnerShops(ownerId: number) {
  const { getOwnerShops } = useBackendAccessContext();
  const shops = useQuery({
    queryKey: ["owner shops", ownerId],
    queryFn: () => getOwnerShops(ownerId),
    enabled: !isNaN(ownerId),
    staleTime: Infinity
  });

  return shops;
}

export function useReservationsForOwner(ownerId: number, shopId?: number) {
  const { getReservationsForOwner } = useBackendAccessContext();

  const reservations = useInfiniteQuery({
    queryKey: ["reservations for owner", ownerId, shopId],
    queryFn: ({ pageParam }) =>
      getReservationsForOwner(ownerId, shopId!, pageParam),
    initialPageParam: 1,
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
    enabled: shopId !== undefined,
    staleTime: Infinity
  });

  useEffect(() => {
    if (reservations.hasNextPage) {
      reservations.fetchNextPage();
    }
  }, [reservations]);

  return reservations;
}

export function useCheckInUrl(reservationId?: number) {
  const queryClient = useQueryClient();
  const { getCheckInUrl } = useBackendAccessContext();

  const url = useQuery({
    queryKey: ["check-in url", reservationId],
    queryFn: () => getCheckInUrl(reservationId!),
    enabled: reservationId !== undefined,
    staleTime: Infinity
  });

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["check-in url"] });
  }

  return { ...url, invalidate };
}

export function useReviews(shopId: number) {
  const queryClient = useQueryClient();
  const { getReviews, postReviews } = useBackendAccessContext();

  const reviews = useInfiniteQuery({
    queryKey: ["reviews", shopId],
    queryFn: ({ pageParam }) => getReviews(shopId, pageParam),
    initialPageParam: 1,
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
    if (reviews.hasNextPage) {
      reviews.fetchNextPage();
    }
  }, [reviews]);

  const post = useMutation({
    mutationFn: (body: { rating: number; comment: string }) => {
      return postReviews(shopId, body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews", shopId] });
    }
  });

  return { ...reviews, post: post.mutate };
}
