import { createContext, useContext, useEffect, useState } from "react";

import {
  Client,
  GetAreasResult,
  GetAuthStatusResult,
  GetGenresResult
} from "../Client";

export interface BackendAccessContextType {
  authStatus: GetAuthStatusResult | null;
  logout: () => Promise<void>;
  getAreas: () => Promise<GetAreasResult["areas"]>;
  getGenres: () => Promise<GetGenresResult["genres"]>;
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
    addFavorite: (userId: number, shopId: number) =>
      httpClient.postCustomerShopFavorite(userId, shopId),
    removeFavorite: (userId: number, shopId: number) =>
      httpClient.deleteCustomerShopFavorite(userId, shopId)
  };
}
