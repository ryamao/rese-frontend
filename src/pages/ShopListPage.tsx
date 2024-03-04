import { useEffect } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PageBase } from "./PageBase";
import { ShopOverviewCard } from "../components/ShopOverviewCard";
import { ShopSearchForm } from "../components/ShopSearchForm";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";
import {
  ShopSearchContext,
  ShopSearchParams,
  useShopSearchState
} from "../contexts/ShopSearchContext";
import { GetShopsResult } from "../HttpClient";

export function ShopListPage() {
  const { getShops } = useBackendAccessContext();
  const shopSearch = useShopSearchState();
  const { data, isLoading, hasNextPage, fetchNextPage } =
    usePageQuery(getShops);

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [data, hasNextPage, fetchNextPage]);

  if (isLoading || !data) {
    return (
      <PageBase>
        <p>Loading...</p>
      </PageBase>
    );
  }

  const shops = data.pages.flatMap((page) => page.data);

  return (
    <PageBase wrapperStyle={pageBaseStyle}>
      <ShopSearchContext.Provider value={shopSearch}>
        <ShopSearchForm />
        <ShopLayout>
          {searchByQuery(shops, shopSearch.params).map((shop) => (
            <ShopOverviewCard
              key={shop.id}
              id={shop.id}
              imageUrl={shop.image_url}
              name={shop.name}
              area={shop.area}
              genre={shop.genre}
              favoriteStatus={shop.favorite_status}
            />
          ))}
        </ShopLayout>
      </ShopSearchContext.Provider>
    </PageBase>
  );
}

function usePageQuery(getShops: (page: number) => Promise<GetShopsResult>) {
  return useInfiniteQuery({
    queryKey: ["shops"],
    queryFn: async ({ pageParam }) => await getShops(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined;
    }
  });
}

function searchByQuery(
  shops: GetShopsResult["data"],
  { area, genre, search }: ShopSearchParams
) {
  return shops.filter((shop) => {
    return (
      (!area || shop.area.id === area) &&
      (!genre || shop.genre.id === genre) &&
      (search === "" || shop.name.includes(search))
    );
  });
}

const pageBaseStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto minmax(50%, 40rem);
  row-gap: 2rem;
  max-width: 1230px;
  padding: 2rem;
  margin: 0 auto;

  & > *:nth-child(1) {
    grid-column: 1 / 2;
  }

  & > *:nth-child(2) {
    grid-column: 2 / 3;
  }

  & > *:nth-child(3) {
    grid-column: 1 / 3;
  }

  @media (width <= 768px) {
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    padding: 1rem;

    & > *:nth-child(1) {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    & > *:nth-child(2) {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }

    & > *:nth-child(3) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
  }
`;

const ShopLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 2rem 1rem;
`;
