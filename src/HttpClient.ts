import imageCompression from "browser-image-compression";
import createClient, { Middleware } from "openapi-fetch";

import * as api from "./api";
import {
  AuthStatus,
  CreateShopError,
  OwnerShopData,
  Pagination,
  PostNotificationEmailBody,
  PostOwnerShopsBody,
  PostOwnersBody,
  PostReservationBillingBody,
  PostReservationPaymentBody,
  PostShopReviews422Response,
  PostShopReviewsBody,
  PutOwnerShopBody,
  ReservationData,
  ReservationForOwner,
  ShopData,
  ShopReviewData
} from "./models";
import { getCookieValue } from "./utils";

export type EndpointResponse<T, E = never> =
  | { success: true; data: T }
  | { success: false; status: number; message?: string; errors?: E };

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

export type PutCustomerReservationBody =
  api.components["requestBodies"]["put-customer-reservation"]["content"]["application/json"];

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
  private baseUrl: string;
  private client: ReturnType<typeof createClient<api.paths>>;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL) {
    this.baseUrl = baseUrl;
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

  async postAuthEmailVerificationNotification(): Promise<
    EndpointResponse<undefined>
  > {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { response } = await this.client.POST(
        "/auth/email/verification-notification"
      );
      if (response.status === 202) {
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

  async getAuthStatus(): Promise<AuthStatus> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data } = await this.client.GET("/auth/status");
      if (!data) {
        throw new Error("認証情報が取得できませんでした");
      }
      switch (data.status) {
        case "guest":
          return { status: "guest" };
        case "admin":
        case "owner":
        case "customer":
          return {
            status: data.status,
            id: data.id,
            has_verified_email: data.has_verified_email
          };
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

  async putCustomerReservation(
    customerId: number,
    reservationId: number,
    body: PutCustomerReservationBody
  ): Promise<EndpointResponse<never>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { response } = await this.client.PUT(
        "/customers/{customer}/reservations/{reservation}",
        {
          params: {
            path: { customer: customerId, reservation: reservationId }
          },
          body
        }
      );
      if (response.status === 204) {
        return { success: true, data: undefined as never };
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
      const { data, response } = await this.client.POST(
        "/customers/{customer}/shops/{shop}/reservations",
        {
          params: { path: { customer: customerId, shop: shopId } },
          body
        }
      );
      if (data) {
        return data.reservation;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async postOwners(body: PostOwnersBody): Promise<EndpointResponse<never>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { response } = await this.client.POST("/owners", { body });
      if (response.status === 201) {
        return { success: true, data: undefined as never };
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

  async postNotificationEmail(
    body: PostNotificationEmailBody
  ): Promise<EndpointResponse<never>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { response } = await this.client.POST("/notification-email", {
        body
      });
      if (response.status === 201) {
        return { success: true, data: undefined as never };
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

  async getOwnerShops(
    ownerId: number
  ): Promise<EndpointResponse<OwnerShopData[]>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(
        "/owners/{owner}/shops",
        {
          params: { path: { owner: ownerId } }
        }
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

  async postOwnerShops(
    ownerId: number,
    body: PostOwnerShopsBody
  ): Promise<EndpointResponse<OwnerShopData, CreateShopError["errors"]>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");

      const headers: HeadersInit = {
        Accept: "application/json"
      };
      const token = getCookieValue("XSRF-TOKEN");
      if (token) {
        headers["X-XSRF-TOKEN"] = token;
      }

      const imageFile = body.image as File;
      const compressedImage = await imageCompression(imageFile, {
        maxSizeMB: 1
      });

      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("area", body.area);
      formData.append("genre", body.genre);
      formData.append("image", compressedImage);
      formData.append("detail", body.detail);

      const init: RequestInit = {
        method: "POST",
        headers,
        credentials: "include",
        body: formData
      };

      const response = await fetch(
        this.baseUrl + `/owners/${ownerId}/shops`,
        init
      );
      if (response.status === 201) {
        const data = (await response.json()) as OwnerShopData;
        return { success: true, data };
      } else if (response.status === 422) {
        const json = (await response.json()) as CreateShopError;
        return {
          success: false,
          status: response.status,
          message: json.message,
          errors: json.errors
        };
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

  async putOwnerShop(
    ownerId: number,
    shopId: number,
    body: PutOwnerShopBody
  ): Promise<EndpointResponse<never, CreateShopError["errors"]>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");

      const headers: HeadersInit = {
        Accept: "application/json"
      };
      const token = getCookieValue("XSRF-TOKEN");
      if (token) {
        headers["X-XSRF-TOKEN"] = token;
      }

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", body.name);
      formData.append("area", body.area);
      formData.append("genre", body.genre);
      formData.append("detail", body.detail);

      if (body.image instanceof File) {
        const compressedImage = await imageCompression(body.image, {
          maxSizeMB: 1
        });
        formData.append("image", compressedImage);
      }

      const init: RequestInit = {
        method: "POST",
        headers,
        credentials: "include",
        body: formData
      };

      const response = await fetch(
        this.baseUrl + `/owners/${ownerId}/shops/${shopId}`,
        init
      );
      if (response.status === 204) {
        return { success: true, data: undefined as never };
      } else if (response.status === 422) {
        const json = (await response.json()) as CreateShopError;
        return {
          success: false,
          status: response.status,
          message: json.message,
          errors: json.errors
        };
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

  async getOwnerShopReservations(
    ownerId: number,
    shopId: number,
    page?: number
  ): Promise<EndpointResponse<Paginated<ReservationForOwner>>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(
        "/owners/{owner}/shops/{shop}/reservations",
        {
          params: { path: { owner: ownerId, shop: shopId }, page }
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

  async getCheckInUrl(
    reservationId: number
  ): Promise<EndpointResponse<string>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(
        "/reservations/{reservation}/signed-url",
        {
          params: { path: { reservation: reservationId } }
        }
      );
      if (response.status === 200) {
        return { success: true, data: data!.url };
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

  async postCheckIn(url: string): Promise<EndpointResponse<never>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");

      const headers: HeadersInit = {
        Accept: "application/json"
      };
      const token = getCookieValue("XSRF-TOKEN");
      if (token) {
        headers["X-XSRF-TOKEN"] = token;
      }

      const init: RequestInit = {
        method: "POST",
        headers,
        credentials: "include"
      };

      const response = await fetch(url, init);

      if (response.status === 201) {
        return { success: true, data: undefined as never };
      }

      return {
        success: false,
        status: response.status,
        message: response.statusText
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: String(error)
      };
    }
  }

  async postBilling(
    reservationId: number,
    body: PostReservationBillingBody
  ): Promise<EndpointResponse<never>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { response } = await this.client.POST(
        "/reservations/{reservation}/billing",
        {
          params: { path: { reservation: reservationId } },
          body
        }
      );
      if (response.status === 201) {
        return { success: true, data: undefined as never };
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

  async postPayment(
    reservationId: number,
    body: PostReservationPaymentBody
  ): Promise<EndpointResponse<string>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.POST(
        "/reservations/{reservation}/payment",
        {
          params: { path: { reservation: reservationId } },
          body
        }
      );
      if (response.status === 201 && data) {
        return { success: true, data: data };
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

  async getReviews(
    shopId: number,
    page?: number
  ): Promise<EndpointResponse<Paginated<ShopReviewData>>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { data, response } = await this.client.GET(
        "/shops/{shop}/reviews",
        {
          params: { path: { shop: shopId }, query: { page } }
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

  async postReviews(
    shopId: number,
    body: PostShopReviewsBody
  ): Promise<EndpointResponse<never, PostShopReviews422Response>> {
    try {
      await this.client.GET("/sanctum/csrf-cookie");
      const { response } = await this.client.POST("/shops/{shop}/reviews", {
        params: { path: { shop: shopId } },
        body
      });
      if (response.status === 201) {
        return { success: true, data: undefined as never };
      } else if (response.status === 422) {
        const json = (await response.json()) as PostShopReviews422Response;
        return {
          success: false,
          status: response.status,
          message: response.statusText,
          errors: json
        };
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
}
