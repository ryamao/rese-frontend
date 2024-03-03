import styled from "@emotion/styled";

import { FavoriteButton } from "./FavoriteButton";
import { blueButton, whitePanel } from "./styles";
import { useApiAccessContext } from "../contexts/ApiAccessContext";
import { useShopSearchContext } from "../contexts/ShopSearchContext";

export interface ShopOverviewProps {
  id: number;
  imageUrl: string;
  name: string;
  area: { id: number; name: string };
  genre: { id: number; name: string };
  favoriteStatus: "unknown" | "marked" | "unmarked";
}

export function ShopOverviewCard({
  id,
  imageUrl,
  name,
  area,
  genre,
  favoriteStatus
}: ShopOverviewProps) {
  const { setArea, setGenre } = useShopSearchContext();
  const { authStatus, addFavorite, removeFavorite } = useApiAccessContext();

  function handleClickFavoriteButton(
    favoriteStatus: "unknown" | "marked" | "unmarked"
  ) {
    if (authStatus?.status !== "customer") {
      return;
    }

    switch (favoriteStatus) {
      case "marked":
        removeFavorite(authStatus.id, id);
        break;
      case "unmarked":
        addFavorite(authStatus.id, id);
        break;
    }
  }

  return (
    <div className={whitePanel}>
      <Image src={imageUrl} alt={genre.name} />
      <Content>
        <Name>{name}</Name>
        <TagLayout>
          <Tag type="button" onClick={() => setArea(area.id)}>
            #{area.name}
          </Tag>
          <Tag type="button" onClick={() => setGenre(genre.id)}>
            #{genre.name}
          </Tag>
        </TagLayout>
        <ButtonLayout>
          <button type="button" className={blueButton}>
            詳しくみる
          </button>
          <FavoriteButton
            favoriteStatus={favoriteStatus}
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
