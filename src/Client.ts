import { PostAuthLogin422Response, PostAuthLoginBody } from "./models";
import { getCookieValue } from "./utils";

export type GetSanctumCsrfCookieResult =
  | { status: 204 }
  | { status: 500; response: Response };

export type PostAuthLoginResult =
  | { status: 200 }
  | { status: 422; json: PostAuthLogin422Response }
  | { status: 500; error: unknown };

export class Client {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getSanctumCsrfCookie(): Promise<GetSanctumCsrfCookieResult> {
    const response = await this.httpGet("/sanctum/csrf-cookie");
    if (response.ok) {
      return { status: 204 };
    } else {
      return { status: 500, response };
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
