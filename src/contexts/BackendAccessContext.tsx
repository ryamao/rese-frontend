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
  GetShopResult,
  EndpointResponse,
  Paginated
} from "../HttpClient";
import { ReservationData, ShopData } from "../models";

export interface BackendAccessContextType {
  authStatus?: GetAuthStatusResult;
  setAuthStatus: (authStatus?: GetAuthStatusResult) => void;
  register: (body: PostAuthRegisterBody) => Promise<PostAuthRegisterResult>;
  login: (body: PostAuthLoginBody) => Promise<PostAuthLoginResult>;
  logout: () => Promise<void>;
  getCustomer: (id: number) => Promise<GetCustomerResult>;
  getAreas: () => Promise<GetAreasResult["areas"]>;
  getGenres: () => Promise<GetGenresResult["genres"]>;
  getShops: (page: number) => Promise<GetShopsResult>;
  getShop: (id: number) => Promise<GetShopResult>;
  getFavorites: (
    userId: number,
    page?: number
  ) => Promise<EndpointResponse<Paginated<ShopData>>>;
  addFavorite: (userId: number, shopId: number) => Promise<void>;
  removeFavorite: (userId: number, shopId: number) => Promise<void>;
  getReservations: (
    userId: number,
    shopId?: number
  ) => Promise<EndpointResponse<ReservationData[]>>;
  postReservation: (
    userId: number,
    shopId: number,
    reservedAt: Dayjs,
    numberOfGuests: number
  ) => Promise<ReservationData>;
  deleteReservation: (
    userId: number,
    reservationId: number
  ) => Promise<EndpointResponse<undefined>>;
}

export const BackendAccessContext = createContext<BackendAccessContextType>(
  {} as BackendAccessContextType
);

// eslint-disable-next-line react-refresh/only-export-components
export const useBackendAccessContext = () => useContext(BackendAccessContext);

export interface CreateBackendAccessContextTypeProps {
  httpClient: HttpClient;
  authStatus?: GetAuthStatusResult;
  setAuthStatus: (authStatus?: GetAuthStatusResult) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export function createBackendAccessContextType({
  httpClient,
  authStatus,
  setAuthStatus
}: CreateBackendAccessContextTypeProps): BackendAccessContextType {
  async function getReservations(userId: number, shopId?: number) {
    if (shopId) {
      return await httpClient.getCustomerShopReservations(userId, shopId);
    } else {
      return await httpClient.getCustomerReservations(userId);
    }
  }

  return {
    authStatus,
    setAuthStatus,
    register: (body) => httpClient.postAuthRegister(body),
    login: (body) => httpClient.postAuthLogin(body),
    logout: () => httpClient.postAuthLogout(),
    getCustomer: (id) => httpClient.getCustomer(id),
    getAreas: () => httpClient.getAreas().then((result) => result.areas),
    getGenres: () => httpClient.getGenres().then((result) => result.genres),
    getShops: (page) => httpClient.getShops(page),
    getShop: (id) => httpClient.getShop(id),
    getFavorites: (userId, page) =>
      httpClient.getCustomerFavorites(userId, page),
    addFavorite: (userId, shopId) =>
      httpClient.postCustomerShopFavorite(userId, shopId),
    removeFavorite: (userId, shopId) =>
      httpClient.deleteCustomerShopFavorite(userId, shopId),
    getReservations,
    postReservation: (userId, shopId, reservedAt, numberOfGuests) =>
      httpClient.postCustomerShopReservations(userId, shopId, {
        reserved_at: reservedAt.format(),
        number_of_guests: numberOfGuests
      }),
    deleteReservation: (userId, reservationId) =>
      httpClient.deleteCustomerReservation(userId, reservationId)
  };
}
