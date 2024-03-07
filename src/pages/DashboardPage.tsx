import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { PageBase } from "./PageBase";
import { FavoriteShopsArea } from "../components/FavoriteShopsArea";
import { ReservationStatusArea } from "../components/ReservationStatusArea";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { ReservationData, ShopData } from "../models";

export function DashboardPage() {
  const { authStatus, getCustomer } = useBackendAccessContext();

  const customerId = authStatus.status === "customer" ? authStatus.id : 0;

  const customer = useQuery({
    queryKey: ["getCustomer", customerId],
    queryFn: () => getCustomer(customerId)
  });

  if (customer.isError) {
    return <PageBase>Error: {customer.error.message}</PageBase>;
  }
  if (customer.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  return (
    <PageBase>
      <Inner>
        <Name>{customer.data.name}さん</Name>
        <ReservationStatusArea reservations={sampleReservations} />
        <FavoriteShopsArea favorites={sampleFavorites} />
      </Inner>
    </PageBase>
  );
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

const sampleReservations = Array.from(
  { length: 3 },
  (_, index) =>
    ({
      id: index,
      shop: { id: index, name: `Shop ${index}` },
      reserved_at: dayjs().add(index, "day").format("YYYY-MM-DDTHH:mm:ssZ"),
      number_of_guests: 2
    }) as ReservationData
);

const sampleFavorites = Array.from(
  { length: 10 },
  (_, index) =>
    ({
      id: index,
      name: `Shop ${index}`,
      area: { name: `Area ${index % 3}`, id: index },
      genre: { name: `Genre ${index % 3}`, id: index },
      image_url: `https://source.unsplash.com/160x90/?restaurant,${index}`,
      detail: `Detail ${index}`,
      favorite_status: "marked"
    }) as ShopData
);
