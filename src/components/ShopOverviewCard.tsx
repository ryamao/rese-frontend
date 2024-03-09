import { useState } from "react";

import styled from "@emotion/styled";

import { FavoriteButton } from "./FavoriteButton";
import { blueButton, whitePanel } from "./styles";
import { useShopSearchContext } from "../contexts/ShopSearchContext";
import { useFavoriteMutation } from "../hooks/queries";
import { ShopData, ShopDataFavoriteStatus } from "../models";

export interface ShopOverviewProps {
  customerId?: number;
  shop: ShopData;
  onClickDetailButton?: (shop: ShopData) => void;
}

export function ShopOverviewCard({
  customerId,
  shop,
  onClickDetailButton
}: ShopOverviewProps) {
  const { setArea, setGenre } = useShopSearchContext();
  const [favorite, setFavorite] = useState(shop.favorite_status);
  const mutation = useFavoriteMutation(customerId);

  async function handleClickFavoriteButton(
    favoriteStatus: ShopDataFavoriteStatus
  ) {
    switch (favoriteStatus) {
      case "marked":
        mutation.remove(shop.id);
        setFavorite("unmarked");
        break;
      case "unmarked":
        mutation.add(shop.id);
        setFavorite("marked");
        break;
    }
  }

  return (
    <div className={whitePanel}>
      <Image src={shop.image_url} alt={shop.genre.name} />
      <Content>
        <Name>{shop.name}</Name>
        <TagLayout>
          <Tag type="button" onClick={() => setArea(shop.area.id)}>
            #{shop.area.name}
          </Tag>
          <Tag type="button" onClick={() => setGenre(shop.genre.id)}>
            #{shop.genre.name}
          </Tag>
        </TagLayout>
        <ButtonLayout>
          <button
            type="button"
            className={blueButton}
            onClick={() => onClickDetailButton?.(shop)}
          >
            詳しくみる
          </button>
          <FavoriteButton
            favoriteStatus={favorite}
            onClick={handleClickFavoriteButton}
          />
        </ButtonLayout>
      </Content>
    </div>
  );
}

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 0.25rem 0.25rem 0 0;
`;

const Content = styled.div`
  padding: 1rem 1.25rem 1.25rem;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const TagLayout = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const Tag = styled.button`
  padding: 0;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const ButtonLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;
