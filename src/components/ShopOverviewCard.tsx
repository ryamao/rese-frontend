import { useState } from "react";

import styled from "@emotion/styled";

import { FavoriteButton } from "./FavoriteButton";
import { blueButton, whitePanel } from "./styles";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import { useShopSearchContext } from "../contexts/ShopSearchContext";
import { ShopData } from "../models";

export interface ShopOverviewProps {
  shop: ShopData;
}

export function ShopOverviewCard({ shop }: ShopOverviewProps) {
  const { setArea, setGenre } = useShopSearchContext();
  const { authStatus, addFavorite, removeFavorite } = useBackendAccessContext();
  const [favorite, setFavorite] = useState(shop.favorite_status);

  async function handleClickFavoriteButton(
    favoriteStatus: "unknown" | "marked" | "unmarked"
  ) {
    if (authStatus?.status !== "customer") {
      return;
    }

    switch (favoriteStatus) {
      case "marked":
        await removeFavorite(authStatus.id, shop.id);
        setFavorite("unmarked");
        break;
      case "unmarked":
        await addFavorite(authStatus.id, shop.id);
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
          <button type="button" className={blueButton}>
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

const Name = styled.h2`
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
