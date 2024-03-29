import styled from "@emotion/styled";

import { ShopOverviewCard } from "./ShopOverviewCard";
import { ShopData } from "../models";

export interface FavoriteShopsAreaProps {
  customerId: number;
  favorites: ShopData[];
  onClickDetailButton?: (shop: ShopData) => void;
}

export function FavoriteShopsArea({
  customerId,
  favorites,
  onClickDetailButton
}: FavoriteShopsAreaProps) {
  return (
    <div>
      <Heading>お気に入り店舗</Heading>
      <ShopLayout>
        {favorites.map((favorite) => (
          <ShopOverviewCard
            key={favorite.id}
            customerId={customerId}
            shop={favorite}
            onClickDetailButton={onClickDetailButton}
          />
        ))}
      </ShopLayout>
    </div>
  );
}

const Heading = styled.h2`
  margin: 1.5rem 0.125rem;
`;

const ShopLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (width <= 1024px) {
    grid-template-columns: 1fr;
  }
`;
