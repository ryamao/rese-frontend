import styled from "@emotion/styled";

import { FavoriteButton } from "./FavoriteButton";
import { blueButton, whitePanel } from "./styles";

export interface ShopOverviewProps {
  imageUrl: string;
  name: string;
  area: string;
  genre: string;
}

export function ShopOverview({
  imageUrl,
  name,
  area,
  genre
}: ShopOverviewProps) {
  return (
    <Card className={whitePanel}>
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
          <FavoriteButton isFavorite={false} />
        </ButtonLayout>
      </Content>
    </Card>
  );
}

const Card = styled.div``;

const Image = styled.img`
  width: 100%;
  border-radius: 0.25rem 0.25rem 0 0;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem 1.25rem 1.25rem 1.25rem;
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
  border: none;
  background-color: transparent;
  font-size: 0.9rem;
  padding: 0;
  cursor: pointer;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
