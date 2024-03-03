import styled from "@emotion/styled";

import { FavoriteButton } from "./FavoriteButton";
import { blueButton, whitePanel } from "./styles";

export interface ShopOverviewProps {
  imageUrl: string;
  name: string;
  area: string;
  genre: string;
  favoriteStatus: "unknown" | "marked" | "unmarked";
}

export function ShopOverviewCard({
  imageUrl,
  name,
  area,
  genre,
  favoriteStatus
}: ShopOverviewProps) {
  return (
    <div className={whitePanel}>
      <Image src={imageUrl} alt={genre} />
      <Content>
        <Name>{name}</Name>
        <TagLayout>
          <Tag type="button">#{area}</Tag>
          <Tag type="button">#{genre}</Tag>
        </TagLayout>
        <ButtonLayout>
          <button type="button" className={blueButton}>
            詳しくみる
          </button>
          <FavoriteButton isFavorite={favoriteStatus === "marked"} />
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
