/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */
import { faker } from "@faker-js/faker";
import * as axios from "axios";
import { HttpResponse, delay, http } from "msw";

import type {
  CreatedResponse,
  GetCustomerFavoritesParams,
  GetSanctumCsrfCookie204Response,
  GetShopsParams,
  NoContentResponse,
  OkResponse,
  PostAuthLoginBody,
  PostAuthRegisterBody,
  PostCustomerShopReservationsBody,
  PostOwnersBody,
  PutCustomerReservationBody
} from "../models";
import type {
  GetAreas200Response,
  GetAuthStatus200Response,
  GetCustomerFavorites200Response,
  GetCustomerReservations200Response,
  GetCustomerShopReservations200Response,
  GetGenres200Response,
  GetShop200Response,
  GetShops200Response,
  PostCustomerShopReservations201Response,
  ShowCustomer200Response
} from "../models";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * エリア一覧を取得する
 * @summary エリア一覧取得
 */
export const getAreas = <TData = AxiosResponse<GetAreas200Response>>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/areas`, options);
};

/**
 * 認証状態を取得する
 * @summary 認証状態取得
 */
export const getAuthStatus = <TData = AxiosResponse<GetAuthStatus200Response>>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/auth/status`, options);
};

/**
 * セッション中の顧客情報を取得する
 * @summary 顧客情報取得
 */
export const getCustomer = <TData = AxiosResponse<ShowCustomer200Response>>(
  customer: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/customers/${customer}`, options);
};

/**
 * セッション中の顧客がお気に入り登録している飲食店の一覧を取得する
 * @summary マイページでのお気に入り一覧取得機能
 */
export const getCustomerFavorites = <
  TData = AxiosResponse<GetCustomerFavorites200Response>
>(
  customer: number,
  params?: GetCustomerFavoritesParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/customers/${customer}/favorites`, {
    ...options,
    params: { ...params, ...options?.params }
  });
};

/**
 * セッション中の顧客が行っている予約の一覧を取得する
 * @summary マイページでの予約一覧取得機能
 */
export const getCustomerReservations = <
  TData = AxiosResponse<GetCustomerReservations200Response>
>(
  customer: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/customers/${customer}/reservations`, options);
};

/**
 * セッション中の顧客が行っている指定の予約を変更する
 * @summary マイページでの予約変更機能
 */
export const putCustomerReservation = <
  TData = AxiosResponse<NoContentResponse>
>(
  customer: number,
  reservation: number,
  putCustomerReservationBody: PutCustomerReservationBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.put(
    `/customers/${customer}/reservations/${reservation}`,
    putCustomerReservationBody,
    options
  );
};

/**
 * セッション中の顧客が指定の飲食店で行っている指定の予約を取り消す
 * @summary マイページでの予約取り消し機能
 */
export const deleteCustomerReservations = <
  TData = AxiosResponse<NoContentResponse>
>(
  customer: number,
  reservation: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.delete(
    `/customers/${customer}/reservations/${reservation}`,
    options
  );
};

/**
 * セッション中の顧客が指定の飲食店をお気に入り登録する
 * @summary お気に入り登録
 */
export const postCustomerShopFavorite = <
  TData = AxiosResponse<CreatedResponse>
>(
  customer: number,
  shop: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(
    `/customers/${customer}/shops/${shop}/favorite`,
    undefined,
    options
  );
};

/**
 * セッション中の顧客が指定の飲食店のお気に入りを解除する
 * @summary お気に入り解除
 */
export const deleteCustomerShopFavorite = <
  TData = AxiosResponse<NoContentResponse>
>(
  customer: number,
  shop: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.delete(
    `/customers/${customer}/shops/${shop}/favorite`,
    options
  );
};

/**
 * セッション中の顧客が指定の飲食店で行っている予約を一覧取得する
 * @summary 飲食店詳細ページでの予約一覧取得機能
 */
export const getCustomerShopReservations = <
  TData = AxiosResponse<GetCustomerShopReservations200Response>
>(
  customer: number,
  shop: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(
    `/customers/${customer}/shops/${shop}/reservations`,
    options
  );
};

/**
 * セッション中の顧客が指定の飲食店で予約を追加する
 * @summary 飲食店詳細ページでの予約追加機能
 */
export const postCustomerShopReservations = <
  TData = AxiosResponse<PostCustomerShopReservations201Response>
>(
  customer: number,
  shop: number,
  postCustomerShopReservationsBody: PostCustomerShopReservationsBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(
    `/customers/${customer}/shops/${shop}/reservations`,
    postCustomerShopReservationsBody,
    options
  );
};

/**
 * ジャンル一覧を取得する
 * @summary ジャンル一覧取得
 */
export const getGenres = <TData = AxiosResponse<GetGenres200Response>>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/genres`, options);
};

/**
 * 店舗代表者アカウントを追加する
 * @summary 店舗代表者追加
 */
export const postOwners = <TData = AxiosResponse<CreatedResponse>>(
  postOwnersBody: PostOwnersBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/owners`, postOwnersBody, options);
};

/**
 * 飲食店一覧を取得する
 * @summary 飲食店一覧取得
 */
export const getShops = <TData = AxiosResponse<GetShops200Response>>(
  params?: GetShopsParams,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/shops`, {
    ...options,
    params: { ...params, ...options?.params }
  });
};

/**
 * 飲食店情報を個別に取得する
 * @summary 飲食店情報取得
 */
export const getShop = <TData = AxiosResponse<GetShop200Response>>(
  shop: number,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/shops/${shop}`, options);
};

/**
 * CSRFトークンを取得する
 * @summary CSRFトークン取得
 */
export const getSanctumCsrfCookie = <
  TData = AxiosResponse<GetSanctumCsrfCookie204Response>
>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/sanctum/csrf-cookie`, options);
};

/**
 * 顧客を新規登録する
 * @summary 顧客登録
 */
export const postAuthRegister = <
  TData = AxiosResponse<CreatedResponse | NoContentResponse>
>(
  postAuthRegisterBody: PostAuthRegisterBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/auth/register`, postAuthRegisterBody, options);
};

/**
 * メールアドレス確認通知を登録メールアドレスに送信する
 * @summary 確認メール送信
 */
export const postAuthEmailVerificationNotification = <
  TData = AxiosResponse<NoContentResponse>
>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(
    `/auth/email/verification-notification`,
    undefined,
    options
  );
};

/**
 * メールでの本人確認を行う
 * @summary メールアドレス確認
 */
export const getAuthEmailVerify = <TData = AxiosResponse<NoContentResponse>>(
  user: number,
  hash: string,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.get(`/auth/email/verify/${user}/${hash}`, options);
};

/**
 * 顧客のログイン処理を行う
 * @summary ログイン
 */
export const postAuthLogin = <
  TData = AxiosResponse<OkResponse | NoContentResponse>
>(
  postAuthLoginBody: PostAuthLoginBody,
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/auth/login`, postAuthLoginBody, options);
};

/**
 * 顧客のログアウト処理を行う
 * @summary ログアウト
 */
export const postAuthLogout = <TData = AxiosResponse<NoContentResponse>>(
  options?: AxiosRequestConfig
): Promise<TData> => {
  return axios.default.post(`/auth/logout`, undefined, options);
};

export type GetAreasResult = AxiosResponse<GetAreas200Response>;
export type GetAuthStatusResult = AxiosResponse<GetAuthStatus200Response>;
export type GetCustomerResult = AxiosResponse<ShowCustomer200Response>;
export type GetCustomerFavoritesResult =
  AxiosResponse<GetCustomerFavorites200Response>;
export type GetCustomerReservationsResult =
  AxiosResponse<GetCustomerReservations200Response>;
export type PutCustomerReservationResult = AxiosResponse<NoContentResponse>;
export type DeleteCustomerReservationsResult = AxiosResponse<NoContentResponse>;
export type PostCustomerShopFavoriteResult = AxiosResponse<CreatedResponse>;
export type DeleteCustomerShopFavoriteResult = AxiosResponse<NoContentResponse>;
export type GetCustomerShopReservationsResult =
  AxiosResponse<GetCustomerShopReservations200Response>;
export type PostCustomerShopReservationsResult =
  AxiosResponse<PostCustomerShopReservations201Response>;
export type GetGenresResult = AxiosResponse<GetGenres200Response>;
export type PostOwnersResult = AxiosResponse<CreatedResponse>;
export type GetShopsResult = AxiosResponse<GetShops200Response>;
export type GetShopResult = AxiosResponse<GetShop200Response>;
export type GetSanctumCsrfCookieResult =
  AxiosResponse<GetSanctumCsrfCookie204Response>;
export type PostAuthRegisterResult = AxiosResponse<
  CreatedResponse | NoContentResponse
>;
export type PostAuthEmailVerificationNotificationResult =
  AxiosResponse<NoContentResponse>;
export type GetAuthEmailVerifyResult = AxiosResponse<NoContentResponse>;
export type PostAuthLoginResult = AxiosResponse<OkResponse | NoContentResponse>;
export type PostAuthLogoutResult = AxiosResponse<NoContentResponse>;

export const getGetAreasResponseMock = (
  overrideResponse: any = {}
): GetAreas200Response => ({
  areas: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    ...overrideResponse
  })),
  ...overrideResponse
});

export const getGetAuthStatusResponseMock = (
  overrideResponse: any = {}
): GetAuthStatus200Response =>
  faker.helpers.arrayElement([
    {
      status: faker.helpers.arrayElement(["guest"] as const),
      ...overrideResponse
    },
    {
      has_verified_email: faker.datatype.boolean(),
      id: faker.number.int({ min: undefined, max: undefined }),
      status: faker.helpers.arrayElement([
        "admin",
        "owner",
        "customer"
      ] as const),
      ...overrideResponse
    }
  ]);

export const getGetCustomerResponseMock = (
  overrideResponse: any = {}
): ShowCustomer200Response => ({
  name: faker.word.sample(),
  ...overrideResponse
});

export const getGetCustomerFavoritesResponseMock = (
  overrideResponse: any = {}
): GetCustomerFavorites200Response => ({
  links: {
    first: faker.internet.url(),
    last: faker.internet.url(),
    next: faker.internet.url(),
    prev: faker.internet.url(),
    ...overrideResponse
  },
  meta: {
    current_page: faker.number.int({ min: 1, max: undefined }),
    from: {},
    last_page: faker.number.int({ min: 1, max: undefined }),
    links: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({
      active: faker.datatype.boolean(),
      label: faker.word.sample(),
      url: faker.internet.url(),
      ...overrideResponse
    })),
    path: faker.internet.url(),
    per_page: faker.number.int({ min: 1, max: undefined }),
    to: {},
    total: faker.number.int({ min: 0, max: undefined }),
    ...overrideResponse
  },
  ...overrideResponse,
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    area: {
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.word.sample(),
      ...overrideResponse
    },
    detail: faker.word.sample(),
    favorite_status: faker.helpers.arrayElement([
      "unknown",
      "marked",
      "unmarked"
    ] as const),
    genre: {
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.word.sample(),
      ...overrideResponse
    },
    id: faker.number.int({ min: undefined, max: undefined }),
    image_url: faker.internet.url(),
    name: faker.word.sample(),
    ...overrideResponse
  })),
  ...overrideResponse
});

export const getGetCustomerReservationsResponseMock = (
  overrideResponse: any = {}
): GetCustomerReservations200Response => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    number_of_guests: faker.number.int({ min: 1, max: undefined }),
    reserved_at: `${faker.date.past().toISOString().split(".")[0]}Z`,
    shop: {
      area: {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
        ...overrideResponse
      },
      detail: faker.word.sample(),
      favorite_status: faker.helpers.arrayElement([
        "unknown",
        "marked",
        "unmarked"
      ] as const),
      genre: {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
        ...overrideResponse
      },
      id: faker.number.int({ min: undefined, max: undefined }),
      image_url: faker.internet.url(),
      name: faker.word.sample(),
      ...overrideResponse
    },
    ...overrideResponse
  })),
  ...overrideResponse
});

export const getGetCustomerShopReservationsResponseMock = (
  overrideResponse: any = {}
): GetCustomerShopReservations200Response => ({
  reservations: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    number_of_guests: faker.number.int({ min: 1, max: undefined }),
    reserved_at: `${faker.date.past().toISOString().split(".")[0]}Z`,
    shop: {
      area: {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
        ...overrideResponse
      },
      detail: faker.word.sample(),
      favorite_status: faker.helpers.arrayElement([
        "unknown",
        "marked",
        "unmarked"
      ] as const),
      genre: {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
        ...overrideResponse
      },
      id: faker.number.int({ min: undefined, max: undefined }),
      image_url: faker.internet.url(),
      name: faker.word.sample(),
      ...overrideResponse
    },
    ...overrideResponse
  })),
  ...overrideResponse
});

export const getPostCustomerShopReservationsResponseMock = (
  overrideResponse: any = {}
): PostCustomerShopReservations201Response => ({
  reservation: {
    id: faker.number.int({ min: undefined, max: undefined }),
    number_of_guests: faker.number.int({ min: 1, max: undefined }),
    reserved_at: `${faker.date.past().toISOString().split(".")[0]}Z`,
    shop: {
      area: {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
        ...overrideResponse
      },
      detail: faker.word.sample(),
      favorite_status: faker.helpers.arrayElement([
        "unknown",
        "marked",
        "unmarked"
      ] as const),
      genre: {
        id: faker.number.int({ min: undefined, max: undefined }),
        name: faker.word.sample(),
        ...overrideResponse
      },
      id: faker.number.int({ min: undefined, max: undefined }),
      image_url: faker.internet.url(),
      name: faker.word.sample(),
      ...overrideResponse
    },
    ...overrideResponse
  },
  ...overrideResponse
});

export const getGetGenresResponseMock = (
  overrideResponse: any = {}
): GetGenres200Response => ({
  genres: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    id: faker.number.int({ min: undefined, max: undefined }),
    name: faker.word.sample(),
    ...overrideResponse
  })),
  ...overrideResponse
});

export const getGetShopsResponseMock = (
  overrideResponse: any = {}
): GetShops200Response => ({
  links: {
    first: faker.internet.url(),
    last: faker.internet.url(),
    next: faker.internet.url(),
    prev: faker.internet.url(),
    ...overrideResponse
  },
  meta: {
    current_page: faker.number.int({ min: 1, max: undefined }),
    from: {},
    last_page: faker.number.int({ min: 1, max: undefined }),
    links: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1
    ).map(() => ({
      active: faker.datatype.boolean(),
      label: faker.word.sample(),
      url: faker.internet.url(),
      ...overrideResponse
    })),
    path: faker.internet.url(),
    per_page: faker.number.int({ min: 1, max: undefined }),
    to: {},
    total: faker.number.int({ min: 0, max: undefined }),
    ...overrideResponse
  },
  ...overrideResponse,
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    area: {
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.word.sample(),
      ...overrideResponse
    },
    detail: faker.word.sample(),
    favorite_status: faker.helpers.arrayElement([
      "unknown",
      "marked",
      "unmarked"
    ] as const),
    genre: {
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.word.sample(),
      ...overrideResponse
    },
    id: faker.number.int({ min: undefined, max: undefined }),
    image_url: faker.internet.url(),
    name: faker.word.sample(),
    ...overrideResponse
  })),
  ...overrideResponse
});

export const getGetShopResponseMock = (
  overrideResponse: any = {}
): GetShop200Response => ({
  data: {
    area: {
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.word.sample(),
      ...overrideResponse
    },
    detail: faker.word.sample(),
    favorite_status: faker.helpers.arrayElement([
      "unknown",
      "marked",
      "unmarked"
    ] as const),
    genre: {
      id: faker.number.int({ min: undefined, max: undefined }),
      name: faker.word.sample(),
      ...overrideResponse
    },
    id: faker.number.int({ min: undefined, max: undefined }),
    image_url: faker.internet.url(),
    name: faker.word.sample(),
    ...overrideResponse
  },
  ...overrideResponse
});

export const getGetAreasMockHandler = (
  overrideResponse?: GetAreas200Response
) => {
  return http.get("*/areas", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetAreasResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getGetAuthStatusMockHandler = (
  overrideResponse?: GetAuthStatus200Response
) => {
  return http.get("*/auth/status", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetAuthStatusResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getGetCustomerMockHandler = (
  overrideResponse?: ShowCustomer200Response
) => {
  return http.get("*/customers/:customer", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetCustomerResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getGetCustomerFavoritesMockHandler = (
  overrideResponse?: GetCustomerFavorites200Response
) => {
  return http.get("*/customers/:customer/favorites", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getGetCustomerFavoritesResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getGetCustomerReservationsMockHandler = (
  overrideResponse?: GetCustomerReservations200Response
) => {
  return http.get("*/customers/:customer/reservations", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getGetCustomerReservationsResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getPutCustomerReservationMockHandler = () => {
  return http.put(
    "*/customers/:customer/reservations/:reservation",
    async () => {
      await delay(1000);
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  );
};

export const getDeleteCustomerReservationsMockHandler = () => {
  return http.delete(
    "*/customers/:customer/reservations/:reservation",
    async () => {
      await delay(1000);
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  );
};

export const getPostCustomerShopFavoriteMockHandler = () => {
  return http.post("*/customers/:customer/shops/:shop/favorite", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getDeleteCustomerShopFavoriteMockHandler = () => {
  return http.delete("*/customers/:customer/shops/:shop/favorite", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getGetCustomerShopReservationsMockHandler = (
  overrideResponse?: GetCustomerShopReservations200Response
) => {
  return http.get(
    "*/customers/:customer/shops/:shop/reservations",
    async () => {
      await delay(1000);
      return new HttpResponse(
        JSON.stringify(
          overrideResponse
            ? overrideResponse
            : getGetCustomerShopReservationsResponseMock()
        ),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  );
};

export const getPostCustomerShopReservationsMockHandler = (
  overrideResponse?: PostCustomerShopReservations201Response
) => {
  return http.post(
    "*/customers/:customer/shops/:shop/reservations",
    async () => {
      await delay(1000);
      return new HttpResponse(
        JSON.stringify(
          overrideResponse
            ? overrideResponse
            : getPostCustomerShopReservationsResponseMock()
        ),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  );
};

export const getGetGenresMockHandler = (
  overrideResponse?: GetGenres200Response
) => {
  return http.get("*/genres", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetGenresResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getPostOwnersMockHandler = () => {
  return http.post("*/owners", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getGetShopsMockHandler = (
  overrideResponse?: GetShops200Response
) => {
  return http.get("*/shops", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetShopsResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getGetShopMockHandler = (
  overrideResponse?: GetShop200Response
) => {
  return http.get("*/shops/:shop", async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse ? overrideResponse : getGetShopResponseMock()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  });
};

export const getGetSanctumCsrfCookieMockHandler = () => {
  return http.get("*/sanctum/csrf-cookie", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getPostAuthRegisterMockHandler = () => {
  return http.post("*/auth/register", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getPostAuthEmailVerificationNotificationMockHandler = () => {
  return http.post("*/auth/email/verification-notification", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getGetAuthEmailVerifyMockHandler = () => {
  return http.get("*/auth/email/verify/:user/:hash", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getPostAuthLoginMockHandler = () => {
  return http.post("*/auth/login", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};

export const getPostAuthLogoutMockHandler = () => {
  return http.post("*/auth/logout", async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
};
export const getReseMock = () => [
  getGetAreasMockHandler(),
  getGetAuthStatusMockHandler(),
  getGetCustomerMockHandler(),
  getGetCustomerFavoritesMockHandler(),
  getGetCustomerReservationsMockHandler(),
  getPutCustomerReservationMockHandler(),
  getDeleteCustomerReservationsMockHandler(),
  getPostCustomerShopFavoriteMockHandler(),
  getDeleteCustomerShopFavoriteMockHandler(),
  getGetCustomerShopReservationsMockHandler(),
  getPostCustomerShopReservationsMockHandler(),
  getGetGenresMockHandler(),
  getPostOwnersMockHandler(),
  getGetShopsMockHandler(),
  getGetShopMockHandler(),
  getGetSanctumCsrfCookieMockHandler(),
  getPostAuthRegisterMockHandler(),
  getPostAuthEmailVerificationNotificationMockHandler(),
  getGetAuthEmailVerifyMockHandler(),
  getPostAuthLoginMockHandler(),
  getPostAuthLogoutMockHandler()
];
