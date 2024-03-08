import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { ErrorPage } from "./ErrorPage";
import { PageBase } from "./PageBase";
import { ShopOverviewCard } from "../components/ShopOverviewCard";
import { ShopSearchForm } from "../components/ShopSearchForm";
import {
  ShopSearchContext,
  ShopSearchParams,
  useShopSearchState
} from "../contexts/ShopSearchContext";
import { useAreas, useGenres, useShops } from "../hooks/queries";
import { ShopData } from "../models";

export function ShopListPage() {
  const handleClickDetailButton = useClickDetailButtonHandler();
  const shopSearch = useShopSearchState();
  const areas = useAreas();
  const genres = useGenres();
  const shops = useShops();

  if (areas.isError) {
    return <ErrorPage message={`500: ${areas.error.message}`} />;
  }
  if (areas.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  if (genres.isError) {
    return <ErrorPage message={`500: ${genres.error.message}`} />;
  }
  if (genres.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  if (shops.isError) {
    return <ErrorPage message={`500: ${shops.error.message}`} />;
  }
  if (shops.isPending) {
    return <PageBase>Loading...</PageBase>;
  }

  const searchedShops = searchByQuery(
    shops.data.pages.flatMap((page) => page.data),
    shopSearch.params
  );

  return (
    <PageBase wrapperStyle={pageBaseStyle}>
      <ShopSearchContext.Provider value={shopSearch}>
        <ShopSearchForm areas={areas.data ?? []} genres={genres.data ?? []} />
        <ShopLayout>
          {searchedShops.map((shop) => (
            <ShopOverviewCard
              key={shop.id}
              shop={shop}
              onClickDetailButton={handleClickDetailButton}
            />
          ))}
        </ShopLayout>
      </ShopSearchContext.Provider>
    </PageBase>
  );
}

function useClickDetailButtonHandler() {
  const navigate = useNavigate();
  return (shop: ShopData) => {
    navigate(`/detail/${shop.id}`, {
      state: shop
    });
  };
}

function searchByQuery(
  shops: ShopData[],
  { area, genre, search }: ShopSearchParams
) {
  return shops.filter(
    (shop) =>
      (!area || shop.area.id === area) &&
      (!genre || shop.genre.id === genre) &&
      (search === "" || shop.name.includes(search))
  );
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
