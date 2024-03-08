import { useEffect } from "react";

import styled from "@emotion/styled";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import { PageBase } from "./PageBase";
import { FavoriteShopsArea } from "../components/FavoriteShopsArea";
import { ReservationStatusArea } from "../components/ReservationStatusArea";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { ReservationData } from "../models";

export function DashboardPage() {
  const customer = useCustomer();
  const reservations = useReservations();
  const favorites = useFavorites();

  if (customer.isError) {
    return <PageBase>Error: {customer.error.message}</PageBase>;
  }
  if (customer.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  if (reservations.isError) {
    return <PageBase>Error: {reservations.error.message}</PageBase>;
  }
  if (reservations.isPending) {
    return <PageBase>Loading...</PageBase>;
  }
  if (!reservations.data.success) {
    return (
      <PageBase>
        {reservations.data.status}: {reservations.data.message}
      </PageBase>
    );
  }

  if (favorites.isError) {
    return <PageBase>Error: {favorites.error.message}</PageBase>;
  }
  if (favorites.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  const favoriteShops = favorites.data.pages.flatMap((page) =>
    page.success ? page.data.data : []
  );

  function handleReservationRemove(reservation: ReservationData) {
    const yes = window.confirm(
      [
        `以下の予約をキャンセルします`,
        `店舗名：${reservation.shop.name}`,
        `予約日時：${reservation.reserved_at}`,
        `予約人数：${reservation.number_of_guests}人`
      ].join("\n")
    );
    if (yes) {
      reservations.cancel(reservation);
    }
  }

  return (
    <PageBase>
      <Inner>
        <Name>{customer.data.name}さん</Name>
        <ReservationStatusArea
          reservations={reservations.data.data}
          onRemove={handleReservationRemove}
        />
        <FavoriteShopsArea favorites={favoriteShops} />
      </Inner>
    </PageBase>
  );
}

function useCustomer() {
  const { authStatus, getCustomer } = useBackendAccessContext();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;
  const customer = useQuery({
    queryKey: ["getCustomer", customerId],
    queryFn: () => getCustomer(customerId),
    enabled: !isNaN(customerId)
  });

  return customer;
}

function useReservations() {
  const queryClient = useQueryClient();
  const { authStatus, getReservations, deleteReservation } =
    useBackendAccessContext();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;
  const queryKey = ["getReservations", customerId];

  const reservations = useQuery({
    queryKey,
    queryFn: () => getReservations(customerId),
    enabled: !isNaN(customerId)
  });

  const cancel = useMutation({
    mutationFn: (reservation: ReservationData) => {
      return deleteReservation(customerId, reservation.id);
    },
    onSuccess: async (data) => {
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey });
      }
    }
  });

  return { ...reservations, cancel: cancel.mutate };
}

function useFavorites() {
  const { authStatus, getFavorites } = useBackendAccessContext();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;
  const queryKey = ["getFavorites", customerId];

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
    }
  });

  useEffect(() => {
    if (favorites.hasNextPage) {
      favorites.fetchNextPage();
    }
  }, [favorites]);

  return favorites;
}

const Inner = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 2fr 3fr;
  gap: 0.5rem 5rem;

  & > *:nth-child(1) {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }

  & > *:nth-child(2) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  & > *:nth-child(3) {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  @media (width <= 1024px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }

  @media (width <= 768px) {
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr;
    gap: 0;

    & > *:nth-child(1) {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    & > *:nth-child(2) {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }

    & > *:nth-child(3) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
  }
`;

const Name = styled.h2`
  margin: 0 auto;
  font-size: 1.75rem;
`;
