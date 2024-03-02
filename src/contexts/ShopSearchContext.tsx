import { createContext, useContext, useState } from "react";

export interface ShopSearchQuery {
  area?: string;
  genre?: string;
  search: string;
}

export interface ShopSearchContextType {
  query: ShopSearchQuery;
  setArea: (area: string) => void;
  setGenre: (genre: string) => void;
  setSearch: (search: string) => void;
}

export const ShopSearchContext = createContext<ShopSearchContextType>(
  {} as ShopSearchContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useShopSearchContext = () => useContext(ShopSearchContext);

export function ShopSearchContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<ShopSearchQuery>({
    search: ""
  });

  const value = {
    query,
    setArea: (area: string) => {
      setQuery((prev) => ({
        ...prev,
        area
      }));
    },
    setGenre: (genre: string) => {
      setQuery((prev) => ({
        ...prev,
        genre
      }));
    },
    setSearch: (search: string) => {
      setQuery((prev) => ({
        ...prev,
        search
      }));
    }
  };

  return (
    <ShopSearchContext.Provider value={value}>
      {children}
    </ShopSearchContext.Provider>
  );
}
