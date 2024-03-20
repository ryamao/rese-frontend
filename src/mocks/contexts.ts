import { BackendAccessContextType } from "../contexts/BackendAccessContext";
import { GetAreasResult, GetGenresResult } from "../HttpClient";
import { AuthStatus } from "../models";

export interface CreateMockBackendAccessStateProps {
  authStatus?: AuthStatus;
  getAreas?: () => Promise<GetAreasResult["areas"]>;
  getGenres?: () => Promise<GetGenresResult["genres"]>;
}

export function createMockBackendAccessState({
  authStatus = { status: "guest" },
  getAreas,
  getGenres
}: CreateMockBackendAccessStateProps): BackendAccessContextType {
  return {
    authStatus,
    setAuthStatus: vitest.fn(),
    postOwners: vitest.fn(),
    postNotificationEmail: vitest.fn(),
    register: vitest.fn(),
    login: vitest.fn(),
    logout: vitest.fn(),
    postResendEmail: vitest.fn(),
    getCustomer: vitest.fn(),
    getAreas: getAreas ?? vitest.fn(),
    getGenres: getGenres ?? vitest.fn(),
    getShops: vitest.fn(),
    getShop: vitest.fn(),
    getFavorites: vitest.fn(),
    addFavorite: vitest.fn(),
    removeFavorite: vitest.fn(),
    getReservations: vitest.fn(),
    postReservation: vitest.fn(),
    putReservation: vitest.fn(),
    deleteReservation: vitest.fn()
  };
}
