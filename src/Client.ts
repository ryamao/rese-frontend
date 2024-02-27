import createClient, { Middleware } from "openapi-fetch";

import * as api from "./api";
import { getCookieValue } from "./utils";

export type GetSanctumCsrfCookieResult =
  | { status: 204 }
  | { status: 500; response: Response };

export type PostAuthRegisterBody =
  api.components["requestBodies"]["post-auth-register"]["content"]["application/json"];

export type PostAuthRegisterResult = {
  data: undefined;
  error?: api.components["responses"]["post-auth-register-422"]["content"]["application/json"];
};

export type PostAuthLoginBody =
  api.components["requestBodies"]["post-auth-login"]["content"]["application/json"];

export type PostAuthLoginResult = {
  data: undefined;
  error?: api.components["responses"]["post-auth-login-422"]["content"]["application/json"];
};

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

  constructor(baseUrl: string) {
    this.client = createClient<api.paths>({ baseUrl });
    this.client.use(middleware);
  }

  async postAuthRegister(
    body: PostAuthRegisterBody
  ): Promise<PostAuthRegisterResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, error } = await this.client.POST("/auth/register", {
        body
      });
      return { data, error };
    } catch (error) {
      return {
        data: undefined,
        error: { message: String(error), errors: {} }
      };
    }
  }

  async postAuthLogin(body: PostAuthLoginBody): Promise<PostAuthLoginResult> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, error } = await this.client.POST("/auth/login", {
        body
      });
      return { data, error };
    } catch (error) {
      return { data: undefined, error: { message: String(error), errors: {} } };
    }
  }
}
