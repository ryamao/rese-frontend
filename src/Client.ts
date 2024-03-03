import createClient, { Middleware } from "openapi-fetch";

import * as api from "./api";
import { getCookieValue } from "./utils";

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

export class Client {
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
      const { data, error } = await this.client.GET(`/customers/{user}`, {
        params: { path: { user: id } }
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

  async postCustomerShopFavorite(
    userId: number,
    shopId: number
  ): Promise<void> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { error } = await this.client.POST(
        "/customers/{user}/shops/{shop}/favorite",
        {
          params: { path: { user: userId, shop: shopId } }
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
    userId: number,
    shopId: number
  ): Promise<void> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { error } = await this.client.DELETE(
        "/customers/{user}/shops/{shop}/favorite",
        {
          params: { path: { user: userId, shop: shopId } }
        }
      );
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
