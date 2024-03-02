import { useEffect, useState } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useLoaderData } from "react-router-dom";

import { PageBase } from "./PageBase";
import { Client, GetAreasResult, GetGenresResult } from "../Client";
import { SearchForm, ShopSearchQuery } from "../components/SearchForm";
import { ShopOverview } from "../components/ShopOverview";

export interface ShopListPageProps {
  httpClient: Client;
  postLogout: () => Promise<void>;
}

export interface ShopListPageLoaderData {
  areas: GetAreasResult["areas"];
  genres: GetGenresResult["genres"];
}

interface ShopOverview {
  id: number;
  name: string;
  area: string;
  genre: string;
  image_url: string;
  favorite_status: "unknown" | "marked" | "unmarked";
}

export function ShopListPage({ httpClient, postLogout }: ShopListPageProps) {
  const { areas, genres } = useLoaderData() as ShopListPageLoaderData;
  const [shops, setShops] = useState<Map<number, ShopOverview>>(new Map());
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [query, setQuery] = useState<ShopSearchQuery>({
    area: "",
    genre: "",
    search: ""
  });

  function handleChangeSearchForm(query: ShopSearchQuery) {
    setQuery(query);
  }

  useEffect(() => {
    console.log("Loading shops: " + nextPage);

    if (!nextPage) return;

    httpClient.getShops(nextPage).then(({ meta, data }) => {
      setShops((prev) => {
        const next = new Map(prev);
        data.forEach((shop) => {
          next.set(shop.id, shop);
        });
        return next;
      });

      if (nextPage < meta.last_page) {
        setNextPage(nextPage + 1);
      } else {
        setNextPage(null);
      }
    });
  }, [httpClient, nextPage]);

  return (
    <PageBase wrapperStyle={pageBaseStyle} postLogout={postLogout}>
      <SearchForm
        areas={areas}
        genres={genres}
        onChange={handleChangeSearchForm}
      />
      <ShopLayout>
        {searchByQuery([...shops.values()], query).map((shop) => (
          <ShopOverview
            key={shop.id}
            imageUrl={shop.image_url}
            name={shop.name}
            area={shop.area}
            genre={shop.genre}
            favoriteStatus={shop.favorite_status}
          />
        ))}
      </ShopLayout>
    </PageBase>
  );
}

function searchByQuery(
  shops: ShopOverview[],
  { area = "", genre = "", search }: ShopSearchQuery
) {
  return shops.filter((shop) => {
    return (
      (area === "" || shop.area === area) &&
      (genre === "" || shop.genre === genre) &&
      (search === "" || shop.name.includes(search))
    );
  });
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
