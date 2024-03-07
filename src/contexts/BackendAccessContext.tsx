import { createContext, useContext } from "react";

import { Dayjs } from "dayjs";

import {
  HttpClient,
  GetAreasResult,
  GetAuthStatusResult,
  PostAuthRegisterBody,
  PostAuthLoginBody,
  GetCustomerResult,
  GetGenresResult,
  GetShopsResult,
  PostAuthLoginResult,
  PostAuthRegisterResult,
  GetShopResult
} from "../HttpClient";
import { ReservationData } from "../models";

export interface BackendAccessContextType {
  authStatus: GetAuthStatusResult;
  register: (body: PostAuthRegisterBody) => Promise<PostAuthRegisterResult>;
  login: (body: PostAuthLoginBody) => Promise<PostAuthLoginResult>;
  logout: () => Promise<void>;
  getCustomer: (id: number) => Promise<GetCustomerResult>;
  getAreas: () => Promise<GetAreasResult["areas"]>;
  getGenres: () => Promise<GetGenresResult["genres"]>;
  getShops: (page: number) => Promise<GetShopsResult>;
  getShop: (id: number) => Promise<GetShopResult>;
  addFavorite: (userId: number, shopId: number) => Promise<void>;
  removeFavorite: (userId: number, shopId: number) => Promise<void>;
  getReservations: (
    userId: number,
    shopId: number
  ) => Promise<ReservationData[]>;
  postReservation: (
    userId: number,
    shopId: number,
    reservedAt: Dayjs,
    numberOfGuests: number
  ) => Promise<ReservationData>;
}

export const BackendAccessContext = createContext<BackendAccessContextType>(
  {} as BackendAccessContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useBackendAccessContext = () => useContext(BackendAccessContext);

export interface CreateBackendAccessContextTypeProps {
  httpClient: HttpClient;
  authStatus: GetAuthStatusResult;
  invalidateAuthStatus: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function createBackendAccessContextType({
  httpClient,
  authStatus,
  invalidateAuthStatus
}: CreateBackendAccessContextTypeProps): BackendAccessContextType {
  async function register(body: PostAuthRegisterBody) {
    const result = await httpClient.postAuthRegister(body);
    if (!result.error) {
      await invalidateAuthStatus();
    }
    return result;
  }

  async function login(body: PostAuthLoginBody) {
    const result = await httpClient.postAuthLogin(body);
    if (!result.error) {
      await invalidateAuthStatus();
    }
    return result;
  }

  async function logout() {
    await httpClient.postAuthLogout();
    await invalidateAuthStatus();
  }

  return {
    authStatus,
    register,
    login,
    logout,
    getCustomer: (id) => httpClient.getCustomer(id),
    getAreas: () => httpClient.getAreas().then((result) => result.areas),
    getGenres: () => httpClient.getGenres().then((result) => result.genres),
    getShops: (page) => httpClient.getShops(page),
    getShop: (id) => httpClient.getShop(id),
    addFavorite: (userId, shopId) =>
      httpClient.postCustomerShopFavorite(userId, shopId),
    removeFavorite: (userId, shopId) =>
      httpClient.deleteCustomerShopFavorite(userId, shopId),
    getReservations: (userId, shopId) =>
      httpClient.getCustomerShopReservations(userId, shopId),
    postReservation: (userId, shopId, reservedAt, numberOfGuests) =>
      httpClient.postCustomerShopReservations(userId, shopId, {
        reserved_at: reservedAt.format(),
        number_of_guests: numberOfGuests
      })
  };
}
