import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useLoaderData } from "react-router-dom";

import { PageBase } from "./PageBase";
import { GetAreasResult } from "../Client";
import { SearchForm } from "../components/SearchForm";
import { ShopOverview } from "../components/ShopOverview";
import { ShopSearchContextProvider } from "../contexts/ShopSearchContext";

export interface ShopListPageProps {
  postLogout: () => Promise<void>;
}

export function ShopListPage(props: ShopListPageProps) {
  const areas = useLoaderData() as GetAreasResult["areas"];

  return (
    <PageBase wrapperStyle={pageBaseStyle} {...props}>
      <ShopSearchContextProvider>
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
      </ShopSearchContextProvider>
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

// const areas = [
//   { id: 1, name: "Shibuya" },
//   { id: 2, name: "Shinjuku" },
//   { id: 3, name: "Ebisu" }
// ];

const genres = [
  { id: 1, name: "Ramen" },
  { id: 2, name: "Sushi" },
  { id: 3, name: "Italian" }
];

const shopList = [
  {
    id: "1",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 1",
    area: "Shibuya",
    genre: "Ramen"
  },
  {
    id: "2",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 2",
    area: "Shinjuku",
    genre: "Sushi"
  },
  {
    id: "3",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 3",
    area: "Ebisu",
    genre: "Italian"
  },
  {
    id: "4",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 4",
    area: "Shibuya",
    genre: "Ramen"
  },
  {
    id: "5",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 5",
    area: "Shinjuku",
    genre: "Sushi"
  },
  {
    id: "6",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 6",
    area: "Ebisu",
    genre: "Italian"
  }
];
