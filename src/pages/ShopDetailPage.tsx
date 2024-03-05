import { css } from "@emotion/css";
import { useQuery } from "@tanstack/react-query";
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
import { ShopData } from "../models";

export function ShopDetailPage() {
  const navigate = useNavigate();
  function handleClickBackButton() {
    navigate(-1);
  }

  const { data, isFetching } = useShopData();
  if (isFetching) {
    return <PageBase>Loading...</PageBase>;
  }
  if (!data) {
    return <PageBase>Error</PageBase>;
  }

  return (
    <PageBase wrapperStyle={wrapperStyle}>
      <ShopDetailArea shop={data} onClickBackButton={handleClickBackButton} />
      <ShopReservationArea />
    </PageBase>
  );
}

function useShopData() {
  const { shopId } = useParams();
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
