import { css } from "@emotion/css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import {
  Location,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

import { ErrorPage } from "./ErrorPage";
import { NotFoundPage } from "./NotFoundPage";
import { PageBase } from "./PageBase";
import { ShopDetailArea } from "../components/ShopDetailArea";
import { ShopReservationArea } from "../components/ShopReservationArea";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { useMenuOverlayContext } from "../contexts/MenuOverlayContext";
import { GetAuthStatusResult, GetShopResult } from "../HttpClient";
import { ShopData } from "../models";

export function ShopDetailPage() {
  const { shopId } = useParams();
  const { authStatus } = useBackendAccessContext();
  const shop = useShopData(shopId);
  const reservations = useReservations(authStatus, shopId);
  const { open } = useMenuOverlayContext();
  const navigate = useNavigate();

  if (shop.isError) {
    return <ErrorPage message={`500: ${shop.error.message}`} />;
  }
  if (shop.isPending) {
    return <PageBase>Loading...</PageBase>;
  }
  if (shop.data.status === 404) {
    return <NotFoundPage message="お探しの店舗は存在しないか削除されました" />;
  }

  if (reservations.isError) {
    return <ErrorPage message={`500: ${reservations.error.message}`} />;
  }
  if (reservations.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  function handleClickBackButton() {
    navigate("/");
  }

  function handleSubmit(reservedAt: Dayjs, numberOfGuests: number) {
    reservations.mutate({ reservedAt, numberOfGuests });
    navigate("/done");
  }

  return (
    <PageBase wrapperStyle={wrapperStyle}>
      <ShopDetailArea
        shop={shop.data.data}
        onClickBackButton={handleClickBackButton}
      />
      <ShopReservationArea
        authStatus={authStatus}
        reservations={reservations.data}
        onSubmit={handleSubmit}
        onClickLogin={open}
      />
    </PageBase>
  );
}

function useShopData(shopId?: string) {
  const { state } = useLocation() as Location<ShopData | undefined>;
  const { getShop } = useBackendAccessContext();

  const data: GetShopResult | undefined = state
    ? { status: 200, data: state }
    : undefined;

  return useQuery({
    queryKey: ["shop", shopId],
    queryFn: async () => {
      return await getShop(Number(shopId));
    },
    enabled: !state,
    initialData: data
  });
}

function useReservations(authStatus: GetAuthStatusResult, shopId?: string) {
  const queryClient = useQueryClient();
  const { getReservations, postReservation } = useBackendAccessContext();
  const queryKey = ["reservations", authStatus, shopId];

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
    queryKey,
    queryFn: async () => {
      if (authStatus.status !== "customer") {
        return [];
      }
      return await getReservations(authStatus.id, Number(shopId));
    },
    enabled: authStatus.status === "customer",
    initialData: [],
    staleTime: Infinity
  });

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: async (data) => {
      if (data) {
        await queryClient.invalidateQueries({ queryKey });
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
