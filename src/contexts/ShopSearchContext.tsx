import { createContext, useContext, useReducer } from "react";

export interface ShopSearchParams {
  area: number | null;
  genre: number | null;
  search: string;
}

export interface ShopSearchContextType {
  params: ShopSearchParams;
  setArea: (area: number | null) => void;
  setGenre: (genre: number | null) => void;
  setSearch: (search: string) => void;
}

export const ShopSearchContext = createContext<ShopSearchContextType>(
  {} as ShopSearchContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useShopSearchContext = () => useContext(ShopSearchContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useShopSearchState(): ShopSearchContextType {
  const [params, dispatch] = useReducer(shopSearchReducer, {
    area: null,
    genre: null,
    search: ""
  });

  return {
    params,
    setArea: (area: number | null) =>
      dispatch({ type: "SET_AREA", payload: area }),
    setGenre: (genre: number | null) =>
      dispatch({ type: "SET_GENRE", payload: genre }),
    setSearch: (search: string) =>
      dispatch({ type: "SET_SEARCH", payload: search })
  };
}

type ShopSearchAction =
  | { type: "SET_AREA"; payload: number | null }
  | { type: "SET_GENRE"; payload: number | null }
  | { type: "SET_SEARCH"; payload: string };

function shopSearchReducer(
  state: ShopSearchParams,
  action: ShopSearchAction
): ShopSearchParams {
  console.log(state, action);
  switch (action.type) {
    case "SET_AREA":
      return {
        ...state,
        area: action.payload
      };
    case "SET_GENRE":
      return {
        ...state,
        genre: action.payload
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload
      };
  }
}
