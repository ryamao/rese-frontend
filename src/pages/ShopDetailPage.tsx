import { css } from "@emotion/css";
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
import { useMenuOverlayContext } from "../contexts/MenuOverlayContext";
import { useShop, useShopReservations } from "../hooks/queries";
import { ShopData } from "../models";
import { useAuthStatus } from "../routes/BackendAccessRoute";

export function ShopDetailPage() {
  const { shopId: shopIdString } = useParams();
  const shopId = shopIdString ? Number(shopIdString) : NaN;

  const { authStatus } = useAuthStatus();
  const customerId = authStatus.status === "customer" ? authStatus.id : NaN;

  const { state } = useLocation() as Location<ShopData | undefined>;
  const shop = useShop(shopId, state);
  const reservations = useShopReservations(customerId, shopId);
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
  if (!reservations.data.success) {
    return (
      <ErrorPage
        message={`${reservations.data.status}: ${reservations.data.message}`}
      />
    );
  }

  function handleClickBackButton() {
    navigate(-1);
  }

  function handleSubmit(reservedAt: Dayjs, numberOfGuests: number) {
    reservations.reserve({ reservedAt, numberOfGuests });
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
        reservations={reservations.data.data}
        onSubmit={handleSubmit}
        onClickLogin={open}
      />
    </PageBase>
  );
}

const wrapperStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 5rem;
  max-width: 1230px;
  padding: 2rem;
  margin: 0 auto;

  & > header {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  & > div {
    grid-row: 2 / 3;
    grid-column: 1 / 1;
  }

  & > form {
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

    & > header {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    & > div {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }

    & > form {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
      margin-top: 2rem;
    }
  }
`;
