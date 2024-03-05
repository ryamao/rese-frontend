import { css } from "@emotion/css";
import { useParams } from "react-router-dom";

import { PageBase } from "./PageBase";
import { ShopDetailArea } from "../components/ShopDetailArea";
import { ShopReservationArea } from "../components/ShopReservationArea";
import { ShopData } from "../models";

export function ShopDetailPage() {
  const { shopId } = useParams();

  if (shopId !== "1") {
    return <PageBase>Not Found</PageBase>;
  }

  const sampleShop = {
    id: 1,
    name: "仙人",
    image_url: "https://via.placeholder.com/800x500",
    area: { id: 1, name: "東京都" },
    genre: { id: 1, name: "寿司" },
    detail:
      "料理長厳選の食材から作る寿司を用いたコースをぜひお楽しみください。食材・味・価格、お客様の満足度を徹底的に追及したお店です。特別な日のお食事、ビジネス接待まで気軽に使用することができます。",
    favorite_status: "unknown"
  } as ShopData;

  return (
    <PageBase wrapperStyle={wrapperStyle}>
      <ShopDetailArea shop={sampleShop} />
      <ShopReservationArea />
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
