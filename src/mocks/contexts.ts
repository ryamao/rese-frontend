import { BackendAccessContextType } from "../contexts/BackendAccessContext";
import {
  GetAreasResult,
  GetAuthStatusResult,
  GetGenresResult
} from "../HttpClient";

export interface CreateMockBackendAccessStateProps {
  authStatus?: GetAuthStatusResult;
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
    register: vitest.fn(),
    login: vitest.fn(),
    logout: vitest.fn(),
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
    deleteReservation: vitest.fn()
  };
}
