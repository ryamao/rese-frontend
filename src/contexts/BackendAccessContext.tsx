import { createContext, useContext } from "react";

import { Dayjs } from "dayjs";

import {
  HttpClient,
  GetAreasResult,
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
import {
  AuthStatus,
  PostOwnersBody,
  ReservationData,
  ShopData
} from "../models";

export interface BackendAccessContextType {
  authStatus?: AuthStatus;
  setAuthStatus: (authStatus?: AuthStatus) => void;
  postOwners: (body: PostOwnersBody) => Promise<EndpointResponse<never>>;
  register: (body: PostAuthRegisterBody) => Promise<PostAuthRegisterResult>;
  login: (body: PostAuthLoginBody) => Promise<PostAuthLoginResult>;
  logout: () => Promise<void>;
  postResendEmail: () => Promise<EndpointResponse<undefined>>;
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
  putReservation: (
    userId: number,
    reservation: ReservationData
  ) => Promise<EndpointResponse<never>>;
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
  authStatus?: AuthStatus;
  setAuthStatus: (authStatus?: AuthStatus) => void;
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
    postOwners: (body) => httpClient.postOwners(body),
    register: (body) => httpClient.postAuthRegister(body),
    login: (body) => httpClient.postAuthLogin(body),
    logout: () => httpClient.postAuthLogout(),
    postResendEmail: () => httpClient.postAuthEmailVerificationNotification(),
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
    putReservation: (userId, { id, reserved_at, number_of_guests }) =>
      httpClient.putCustomerReservation(userId, id, {
        reserved_at,
        number_of_guests
      }),
    deleteReservation: (userId, reservationId) =>
      httpClient.deleteCustomerReservation(userId, reservationId)
  };
}
