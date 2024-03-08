import createClient, { Middleware } from "openapi-fetch";

import * as api from "./api";
import { Pagination, ReservationData, ShopData } from "./models";
import { getCookieValue } from "./utils";

export type EndpointResponse<T> =
  | { success: true; data: T }
  | { success: false; status: number; message?: string };

export type Paginated<T> = Pagination & { data: T[] };

export type GetSanctumCsrfCookieResult =
  | { status: 204 }
  | { status: 500; response: Response };

export type PostAuthRegisterBody =
  api.components["requestBodies"]["post-auth-register"]["content"]["application/json"];

export type PostAuthRegisterResult = {
  error?: api.components["responses"]["post-auth-register-422"]["content"]["application/json"];
};

export type PostAuthLoginBody =
  api.components["requestBodies"]["post-auth-login"]["content"]["application/json"];

export type PostAuthLoginResult = {
  error?: api.components["responses"]["post-auth-login-422"]["content"]["application/json"];
};

export type GetAuthStatusResult =
  | { status: "guest" }
  | { status: "customer"; id: number };

export type GetCustomerResult =
  api.components["responses"]["show-customer-200"]["content"]["application/json"];

export type GetAreasResult =
  api.components["responses"]["get-areas-200"]["content"]["application/json"];

export type GetGenresResult =
  api.components["responses"]["get-genres-200"]["content"]["application/json"];

export type GetShopsResult =
  api.components["responses"]["get-shops-200"]["content"]["application/json"];

export type GetShopResult = { status: 200; data: ShopData } | { status: 404 };

export type PostCustomerShopReservationsBody =
  api.components["requestBodies"]["post-customer-shop-reservations"]["content"]["application/json"];

const middleware: Middleware = {
  async onRequest(req) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    const token = getCookieValue("XSRF-TOKEN");
    if (token) {
      headers["X-XSRF-TOKEN"] = token;
    }

    return new Request(req, {
      credentials: "include",
      headers
    });
  }
};

export class HttpClient {
  private client: ReturnType<typeof createClient<api.paths>>;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL) {
    this.client = createClient<api.paths>({ baseUrl });
    this.client.use(middleware);
  }

  async postAuthRegister(
    body: PostAuthRegisterBody
  ): Promise<PostAuthRegisterResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      return await this.client.POST("/auth/register", {
        body
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async postAuthLogin(body: PostAuthLoginBody): Promise<PostAuthLoginResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      return await this.client.POST("/auth/login", {
        body
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async postAuthLogout(): Promise<void> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { error } = await this.client.POST("/auth/logout");
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getAuthStatus(): Promise<GetAuthStatusResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data } = await this.client.GET("/auth/status");
      if (!data) {
        throw new Error("認証情報が取得できませんでした");
      }
      switch (data.status) {
        case "guest":
          return { status: "guest" };
        case "customer":
          return { status: "customer", id: data.id! };
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getCustomer(id: number): Promise<GetCustomerResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, error } = await this.client.GET(`/customers/{customer}`, {
        params: { path: { customer: id } }
      });
      if (error) {
        throw new Error(error);
      }
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getAreas(): Promise<GetAreasResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, error } = await this.client.GET("/areas");
      if (error) {
        throw new Error(error);
      }
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getGenres(): Promise<GetGenresResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, error } = await this.client.GET("/genres");
      if (error) {
        throw new Error(error);
      }
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getShops(page: number): Promise<GetShopsResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, error } = await this.client.GET("/shops", {
        params: { query: { page } }
      });
      if (error) {
        throw new Error(error);
      }
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getShop(id: number): Promise<GetShopResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(`/shops/{shop}`, {
        params: { path: { shop: id } }
      });
      if (response.status === 200 && data) {
        return { status: 200, data: data.data };
      }
      return { status: 404 };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getCustomerFavorites(
    customerId: number,
    page?: number
  ): Promise<EndpointResponse<Paginated<ShopData>>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(
        "/customers/{customer}/favorites",
        {
          params: {
            path: { customer: customerId },
            query: { page }
          }
        }
      );
      if (response.status === 200 && data) {
        return { success: true, data };
      } else {
        return {
          success: false,
          status: response.status,
          message: response.statusText
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: String(error)
      };
    }
  }

  async postCustomerShopFavorite(
    customerId: number,
    shopId: number
  ): Promise<void> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { error } = await this.client.POST(
        "/customers/{customer}/shops/{shop}/favorite",
        {
          params: { path: { customer: customerId, shop: shopId } }
        }
      );
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async deleteCustomerShopFavorite(
    customerId: number,
    shopId: number
  ): Promise<void> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { error } = await this.client.DELETE(
        "/customers/{customer}/shops/{shop}/favorite",
        {
          params: { path: { customer: customerId, shop: shopId } }
        }
      );
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getCustomerReservations(
    customerId: number
  ): Promise<EndpointResponse<ReservationData[]>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(
        "/customers/{customer}/reservations",
        { params: { path: { customer: customerId } } }
      );
      if (response.status === 200 && data) {
        return { success: true, data: data.data };
      } else {
        return {
          success: false,
          status: response.status,
          message: response.statusText
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: String(error)
      };
    }
  }

  async deleteCustomerReservation(
    customerId: number,
    reservationId: number
  ): Promise<EndpointResponse<undefined>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { response } = await this.client.DELETE(
        "/customers/{customer}/reservations/{reservation}",
        {
          params: { path: { customer: customerId, reservation: reservationId } }
        }
      );
      if (response.status === 204) {
        return { success: true, data: undefined };
      } else {
        return {
          success: false,
          status: response.status,
          message: response.statusText
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: String(error)
      };
    }
  }

  async getCustomerShopReservations(
    customerId: number,
    shopId: number
  ): Promise<EndpointResponse<ReservationData[]>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(
        "/customers/{customer}/shops/{shop}/reservations",
        {
          params: { path: { customer: customerId, shop: shopId } }
        }
      );
      if (response.status === 200 && data) {
        return { success: true, data: data.reservations };
      } else {
        return {
          success: false,
          status: response.status,
          message: response.statusText
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: String(error)
      };
    }
  }

  async postCustomerShopReservations(
    customerId: number,
    shopId: number,
    body: PostCustomerShopReservationsBody
  ): Promise<ReservationData> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, error } = await this.client.POST(
        "/customers/{customer}/shops/{shop}/reservations",
        {
          params: { path: { customer: customerId, shop: shopId } },
          body
        }
      );
      if (error) {
        throw new Error(error.message);
      }
      return data.reservation;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
