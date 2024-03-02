import { css } from "@emotion/css";
import styled from "@emotion/styled";

import { AuthStatus, MenuItem, PageBase } from "./PageBase";
import { SearchForm } from "../components/SearchForm";
import { ShopOverview } from "../components/ShopOverview";

export interface ShopListPageProps {
  authStatus: AuthStatus;
  onClickMenuItem: (item: MenuItem) => void;
  areas: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  shopList: {
    id: string;
    imageUrl: string;
    name: string;
    area: string;
    genre: string;
  }[];
}

export function ShopListPage({
  authStatus,
  onClickMenuItem,
  areas,
  genres,
  shopList
}: ShopListPageProps) {
  return (
    <PageBase
      wrapperStyle={pageBaseStyle}
      authStatus={authStatus}
      onClickMenuItem={onClickMenuItem}
    >
      <SearchForm areas={areas} genres={genres} />
      <ShopLayout>
        {shopList.map((shop) => (
          <ShopOverview
            key={shop.name}
            imageUrl={shop.imageUrl}
            name={shop.name}
            area={shop.area}
            genre={shop.genre}
          />
        ))}
      </ShopLayout>
    </PageBase>
  );
}

const pageBaseStyle = css`
  max-width: 1230px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto minmax(50%, 40rem);
  grid-template-rows: auto 1fr;
  row-gap: 2rem;
  padding: 2rem;

  & > *:nth-child(1) {
    grid-column: 1 / 2;
  }

  & > *:nth-child(2) {
    grid-column: 2 / 3;
  }

  & > *:nth-child(3) {
    grid-column: 1 / 3;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    row-gap: 1rem;
    padding: 1rem;

    & > *:nth-child(1) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    & > *:nth-child(2) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    & > *:nth-child(3) {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }
  }
`;

const ShopLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  column-gap: 1rem;
  row-gap: 2rem;
`;
