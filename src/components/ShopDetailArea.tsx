import styled from "@emotion/styled";

import { BackButton } from "./BackButton";
import { ShopData } from "../models";

export interface ShopDetailAreaProps {
  shop: ShopData;
  onClickBackButton?: () => void;
}

export function ShopDetailArea({
  shop,
  onClickBackButton
}: ShopDetailAreaProps) {
  return (
    <div>
      <Header>
        <BackButton onClick={onClickBackButton} />
        <Title>{shop.name}</Title>
      </Header>
      <Image>
        <img src={shop.image_url} alt={shop.name} />
      </Image>
      <Tags>
        <span>#{shop.area.name}</span>
        <span>#{shop.genre.name}</span>
      </Tags>
      <Detail>{shop.detail}</Detail>
    </div>
  );
}

const Header = styled.div`
  display: flex;
  margin: 1.5rem 0.25rem;
`;

const Title = styled.h2`
  margin: 0 0.75rem;
`;

const Image = styled.div`
  & > img {
    width: 100%;
  }
`;

const Tags = styled.div`
  margin: 1.5rem 0.25rem;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const Detail = styled.p`
  margin: 0 0.25rem;
`;
