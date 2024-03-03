import { createContext, useContext, useEffect, useState } from "react";

import {
  Client,
  GetAreasResult,
  GetAuthStatusResult,
  GetGenresResult,
  GetShopsResult
} from "../Client";

export interface BackendAccessContextType {
  authStatus: GetAuthStatusResult | null;
  logout: () => Promise<void>;
  getAreas: () => Promise<GetAreasResult["areas"]>;
  getGenres: () => Promise<GetGenresResult["genres"]>;
  getShops: (page: number) => Promise<GetShopsResult>;
  addFavorite: (userId: number, shopId: number) => Promise<void>;
  removeFavorite: (userId: number, shopId: number) => Promise<void>;
}

export const BackendAccessContext = createContext<BackendAccessContextType>(
  {} as BackendAccessContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useBackendAccessContext = () => useContext(BackendAccessContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useBackendAccessState(
  httpClient: Client
): BackendAccessContextType {
  const [authStatus, setAuthStatus] = useState<GetAuthStatusResult | null>(
    null
  );

  useEffect(() => {
    httpClient.getAuthStatus().then(setAuthStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    authStatus,
    logout: async () => {
      await httpClient.postAuthLogout();
      setAuthStatus({ status: "guest" });
    },
    getAreas: () => httpClient.getAreas().then((result) => result.areas),
    getGenres: () => httpClient.getGenres().then((result) => result.genres),
    getShops: (page) => httpClient.getShops(page),
    addFavorite: (userId, shopId) =>
      httpClient.postCustomerShopFavorite(userId, shopId),
    removeFavorite: (userId, shopId) =>
      httpClient.deleteCustomerShopFavorite(userId, shopId)
  };
}
