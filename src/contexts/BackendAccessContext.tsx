import { createContext, useContext, useEffect, useState } from "react";

import {
  Client,
  GetAreasResult,
  GetAuthStatusResult,
  GetCustomerResult,
  GetGenresResult,
  GetShopsResult,
  PostAuthLoginResult,
  PostAuthRegisterResult
} from "../Client";

export interface BackendAccessContextType {
  authStatus: GetAuthStatusResult | null;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<PostAuthRegisterResult>;
  login: (email: string, password: string) => Promise<PostAuthLoginResult>;
  logout: () => Promise<void>;
  getCustomer: (id: number) => Promise<GetCustomerResult>;
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

  async function register(name: string, email: string, password: string) {
    const result = await httpClient.postAuthRegister({
      name,
      email,
      password
    });
    if (result.error) {
      return result;
    }

    setAuthStatus(await httpClient.getAuthStatus());

    return { error: undefined };
  }

  async function login(email: string, password: string) {
    const result = await httpClient.postAuthLogin({ email, password });
    if (result.error) {
      return result;
    }

    setAuthStatus(await httpClient.getAuthStatus());

    return { error: undefined };
  }

  return {
    authStatus,
    register,
    login,
    logout: async () => {
      await httpClient.postAuthLogout();
      setAuthStatus(await httpClient.getAuthStatus());
    },
    getCustomer: (id) => httpClient.getCustomer(id),
    getAreas: () => httpClient.getAreas().then((result) => result.areas),
    getGenres: () => httpClient.getGenres().then((result) => result.genres),
    getShops: (page) => httpClient.getShops(page),
    addFavorite: (userId, shopId) =>
      httpClient.postCustomerShopFavorite(userId, shopId),
    removeFavorite: (userId, shopId) =>
      httpClient.deleteCustomerShopFavorite(userId, shopId)
  };
}
