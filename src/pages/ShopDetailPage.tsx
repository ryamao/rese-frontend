import { css } from "@emotion/css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import {
  Location,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

import { PageBase } from "./PageBase";
import { ShopDetailArea } from "../components/ShopDetailArea";
import { ShopReservationArea } from "../components/ShopReservationArea";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { useMenuOverlayContext } from "../contexts/MenuOverlayContext";
import { GetAuthStatusResult } from "../HttpClient";
import { ShopData } from "../models";

export function ShopDetailPage() {
  const { open } = useMenuOverlayContext();

  const navigate = useNavigate();
  function handleClickBackButton() {
    navigate("/");
  }

  const { shopId } = useParams();
  const { authStatus } = useBackendAccessContext();
  const shop = useShopData(shopId);
  const reservations = useReservations(authStatus, shopId);

  if (shop.isFetching || reservations.isFetching) {
    return <PageBase>Loading...</PageBase>;
  }
  if (!shop.data || !reservations.data) {
    return <PageBase>Error</PageBase>;
  }

  function handleSubmit(reservedAt: Dayjs, numberOfGuests: number) {
    reservations.mutate({ reservedAt, numberOfGuests });
  }

  function handleClickLogin() {
    open();
  }

  return (
    <PageBase wrapperStyle={wrapperStyle}>
      <ShopDetailArea
        shop={shop.data}
        onClickBackButton={handleClickBackButton}
      />
      <ShopReservationArea
        authStatus={authStatus}
        reservations={reservations.data}
        onSubmit={handleSubmit}
        onClickLogin={handleClickLogin}
      />
    </PageBase>
  );
}

function useShopData(shopId?: string) {
  const { state } = useLocation() as Location<ShopData | undefined>;
  const { getShop } = useBackendAccessContext();

  return useQuery({
    queryKey: ["shop", shopId],
    queryFn: async () => {
      return await getShop(Number(shopId));
    },
    enabled: !state,
    initialData: state
  });
}

function useReservations(authStatus: GetAuthStatusResult, shopId?: string) {
  const { invalidateQueries } = useQueryClient();
  const { getReservations, postReservation } = useBackendAccessContext();

  async function mutationFn(args: {
    reservedAt: Dayjs;
    numberOfGuests: number;
  }) {
    if (authStatus.status !== "customer" || !shopId) {
      return null;
    }

    return await postReservation(
      authStatus.id,
      Number(shopId),
      args.reservedAt,
      args.numberOfGuests
    );
  }

  const fetch = useQuery({
    queryKey: ["reservations", authStatus, shopId],
    queryFn: async () => {
      if (authStatus.status !== "customer") {
        return [];
      }
      return await getReservations(authStatus.id, Number(shopId));
    },
    enabled: authStatus.status === "customer",
    initialData: []
  });

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (data) {
        invalidateQueries({
          queryKey: ["reservations", authStatus, shopId]
        });
      }
    }
  });

  return { ...fetch, mutate };
}

const wrapperStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 5rem;
  max-width: 1230px;
  padding: 2rem;
  margin: 0 auto;

  & > *:nth-child(1) {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  & > *:nth-child(2) {
    grid-row: 2 / 3;
    grid-column: 1 / 1;
  }

  & > *:nth-child(3) {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }

  @media (width <= 1024px) {
    gap: 2rem;
  }

  @media (width <= 768px) {
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr;
    gap: 0 0;
    padding: 1rem;
    margin-bottom: 2rem;

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
      margin-top: 2rem;
    }
  }
`;
