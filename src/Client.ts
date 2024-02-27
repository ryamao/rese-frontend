import createClient, { Middleware } from "openapi-fetch";

import * as api from "./api";
import { PostAuthLogin422Response, PostAuthLoginBody } from "./models";
import { getCookieValue } from "./utils";

export type GetSanctumCsrfCookieResult =
  | { status: 204 }
  | { status: 500; response: Response };

export type PostAuthRegisterBody =
  api.components["requestBodies"]["post-auth-register"]["content"]["application/json"];

export type PostAuthRegisterResult = {
  data: undefined;
  error?: { message: string; errors: Record<string, string[]> };
};

export type PostAuthLoginResult =
  | { status: 200 }
  | { status: 422; json: PostAuthLogin422Response }
  | { status: 500; error: unknown };

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
  private baseUrl: string;
  private client: ReturnType<typeof createClient<api.paths>>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    this.client = createClient<api.paths>({
      baseUrl: import.meta.env.VITE_API_URL
    });
    this.client.use(middleware);
  }

  async getSanctumCsrfCookie(): Promise<GetSanctumCsrfCookieResult> {
    const response = await this.httpGet("/sanctum/csrf-cookie");
    if (response.ok) {
      return { status: 204 };
    } else {
      return { status: 500, response };
    }
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
      const sanctumResult = await this.getSanctumCsrfCookie();
      if (sanctumResult.status === 500) {
        return { status: 500, error: sanctumResult.response };
      }

      const response = await this.httpPost("/auth/login", {
        body: JSON.stringify(body)
      });

      if (response.ok) {
        return { status: 200 };
      } else {
        const error = await response.json();
        return { status: 422, json: error as PostAuthLogin422Response };
      }
    } catch (error) {
      return { status: 500, error };
    }
  }

  private httpGet(path: string, options?: RequestInit): Promise<Response> {
    return fetch(new URL(path, this.baseUrl), {
      credentials: "include",
      ...options
    });
  }

  private httpPost(path: string, options?: RequestInit): Promise<Response> {
    const token = getCookieValue("XSRF-TOKEN");
    return fetch(new URL(path, this.baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": token ?? ""
      },
      ...options
    });
  }
}
