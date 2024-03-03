import { createContext, useContext, useEffect, useState } from "react";

import { Client, GetAuthStatusResult } from "../Client";

export interface ApiAccessContextType {
  authStatus: GetAuthStatusResult | null;
  addFavorite: (userId: number, shopId: number) => Promise<void>;
  removeFavorite: (userId: number, shopId: number) => Promise<void>;
}

export const ApiAccessContext = createContext<ApiAccessContextType>(
  {} as ApiAccessContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useApiAccessContext = () => useContext(ApiAccessContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useApiAccessState(httpClient: Client): ApiAccessContextType {
  const [authStatus, setAuthStatus] = useState<GetAuthStatusResult | null>(
    null
  );

  useEffect(() => {
    httpClient.getAuthStatus().then(setAuthStatus);
  }, [httpClient]);

  return {
    authStatus,
    addFavorite: (userId: number, shopId: number) =>
      httpClient.postCustomerShopFavorite(userId, shopId),
    removeFavorite: (userId: number, shopId: number) =>
      httpClient.deleteCustomerShopFavorite(userId, shopId)
  };
}
