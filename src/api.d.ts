/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/areas": {
    /**
     * エリア一覧取得
     * @description エリア一覧を取得する
     */
    get: operations["get-areas"];
  };
  "/auth/status": {
    /**
     * 認証状態取得
     * @description 認証状態を取得する
     */
    get: operations["get-auth-status"];
  };
  "/customers/{customer}": {
    /**
     * 顧客情報取得
     * @description セッション中の顧客情報を取得する
     */
    get: operations["get-customer"];
  };
  "/customers/{customer}/favorites": {
    /**
     * マイページでのお気に入り一覧取得機能
     * @description セッション中の顧客がお気に入り登録している飲食店の一覧を取得する
     */
    get: operations["get-customer-favorites"];
  };
  "/customers/{customer}/reservations": {
    /**
     * マイページでの予約一覧取得機能
     * @description セッション中の顧客が行っている予約の一覧を取得する
     */
    get: operations["get-customer-reservations"];
  };
  "/customers/{customer}/reservations/{reservation}": {
    /**
     * マイページでの予約取り消し機能
     * @description セッション中の顧客が指定の飲食店で行っている指定の予約を取り消す
     */
    delete: operations["delete-customer-reservations"];
  };
  "/customers/{customer}/shops/{shop}/favorite": {
    /**
     * お気に入り登録
     * @description セッション中の顧客が指定の飲食店をお気に入り登録する
     */
    post: operations["post-customer-shop-favorite"];
    /**
     * お気に入り解除
     * @description セッション中の顧客が指定の飲食店のお気に入りを解除する
     */
    delete: operations["delete-customer-shop-favorite"];
  };
  "/customers/{customer}/shops/{shop}/reservations": {
    /**
     * 飲食店詳細ページでの予約一覧取得機能
     * @description セッション中の顧客が指定の飲食店で行っている予約を一覧取得する
     */
    get: operations["get-customer-shop-reservations"];
    /**
     * 飲食店詳細ページでの予約追加機能
     * @description セッション中の顧客が指定の飲食店で予約を追加する
     */
    post: operations["post-customer-shop-reservations"];
  };
  "/genres": {
    /**
     * ジャンル一覧取得
     * @description ジャンル一覧を取得する
     */
    get: operations["get-genres"];
  };
  "/shops": {
    /**
     * 飲食店一覧取得
     * @description 飲食店一覧を取得する
     */
    get: operations["get-shops"];
  };
  "/shops/{shop}": {
    /**
     * 飲食店情報取得
     * @description 飲食店情報を個別に取得する
     */
    get: operations["get-shop"];
  };
  "/sanctum/csrf-cookie": {
    /**
     * CSRFトークン取得
     * @description CSRFトークンを取得する
     */
    get: operations["get-sanctum-csrf-cookie"];
  };
  "/auth/register": {
    /**
     * 顧客登録
     * @description 顧客を新規登録する
     */
    post: operations["post-auth-register"];
  };
  "/auth/login": {
    /**
     * ログイン
     * @description 顧客のログイン処理を行う
     */
    post: operations["post-auth-login"];
  };
  "/auth/logout": {
    /**
     * ログアウト
     * @description 顧客のログアウト処理を行う
     */
    post: operations["post-auth-logout"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    "register-error": {
      message: string;
      errors: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
    };
    "login-error": {
      message: string;
      errors: {
        email?: string[];
        password?: string[];
      };
    };
    /** @description エリア情報 */
    "area-data": {
      /**
       * Format: int64
       * @description エリアID
       */
      id: number;
      /** @description エリア名 */
      name: string;
    };
    /** @description ジャンル情報 */
    "genre-data": {
      /**
       * Format: int64
       * @description ジャンルID
       */
      id: number;
      /** @description ジャンル名 */
      name: string;
    };
    /** @description 飲食店情報 */
    "shop-data": {
      /**
       * Format: int64
       * @description 飲食店ID
       */
      id: number;
      /** @description 飲食店名 */
      name: string;
      area: components["schemas"]["area-data"];
      genre: components["schemas"]["genre-data"];
      /**
       * Format: uri
       * @description 画像URL
       */
      image_url: string;
      /** @description 飲食店詳細 */
      detail: string;
      /**
       * @description お気に入りステータス
       * @enum {string}
       */
      favorite_status: "unknown" | "marked" | "unmarked";
    };
    /** @description 予約情報 */
    "reservation-data": {
      /**
       * Format: int64
       * @description 予約ID
       */
      id: number;
      shop: components["schemas"]["shop-data"];
      /**
       * Format: date-time
       * @description 予約日時
       */
      reserved_at: string;
      /** @description 予約人数 */
      number_of_guests: number;
    };
    "reservation-error": {
      message: string;
      errors: {
        reserved_at?: string[];
        number_of_guests?: string[];
      };
    };
    /** @description ページネーション */
    pagination: {
      meta: components["schemas"]["pagination-meta"];
      links: components["schemas"]["pagination-links"];
    };
    /** @description ページネーションメタ情報 */
    "pagination-meta": {
      /** @description 現在のページ番号 */
      current_page: number;
      /** @description 現在のページの最初のレコード番号 */
      from: number | null;
      /** @description 最終ページ番号 */
      last_page: number;
      /** @description ページネーションリンク */
      links: {
        /**
         * Format: uri
         * @description リンクURL
         */
        url: string | null;
        /** @description リンクラベル */
        label: string;
        /** @description アクティブかどうか */
        active: boolean;
      }[];
      /**
       * Format: uri
       * @description 現在のページのURL
       */
      path: string;
      /** @description 1ページあたりの件数 */
      per_page: number;
      /** @description 現在のページの最後のレコード番号 */
      to: number | null;
      /** @description 総件数 */
      total: number;
    };
    /** @description ページネーションリンク */
    "pagination-links": {
      /**
       * Format: uri
       * @description 最初のページのURL
       */
      first: string;
      /**
       * Format: uri
       * @description 最後のページのURL
       */
      last: string;
      /**
       * Format: uri
       * @description 前のページのURL
       */
      prev: string | null;
      /**
       * Format: uri
       * @description 次のページのURL
       */
      next: string | null;
    };
  };
  responses: {
    /** @description OK */
    "show-customer-200": {
      content: {
        "application/json": {
          /** @example テストユーザー */
          name: string;
        };
      };
    };
    /** @description リクエストが成功しリソースが見つかった */
    ok: {
      content: never;
    };
    /** @description リクエストが成功しリソースが作成された */
    created: {
      content: never;
    };
    /** @description リクエストが成功しリソースが存在しない */
    "no-content": {
      content: never;
    };
    /** @description リクエストが成功しリソースが見つかった */
    found: {
      content: never;
    };
    /** @description 認証エラー */
    unauthorized: {
      content: never;
    };
    /** @description 認可エラー */
    forbidden: {
      content: never;
    };
    /** @description 指定されたリソースが存在しない */
    "not-found": {
      content: never;
    };
    /** @description リクエストが競合している */
    conflict: {
      content: never;
    };
    /** @description リクエストが正しくない */
    "unprocessable-entity": {
      content: never;
    };
    /** @description CSRFトークン取得成功 */
    "get-sanctum-csrf-cookie-204": {
      headers: {
        /** @description CSRFトークンをCookieにセット */
        "Set-Cookie": string;
      };
      content: never;
    };
    /** @description 認証状態取得成功 */
    "get-auth-status-200": {
      content: {
        "application/json": {
          /** @enum {string} */
          status: "guest" | "customer";
          /** Format: int64 */
          id?: number;
        };
      };
    };
    /** @description バリデーションエラーまたはメールアドレスが登録済み */
    "post-auth-register-422": {
      content: {
        "application/json": components["schemas"]["register-error"];
      };
    };
    /** @description バリデーションエラーまたは未登録 */
    "post-auth-login-422": {
      content: {
        "application/json": components["schemas"]["login-error"];
      };
    };
    /** @description エリア一覧取得成功 */
    "get-areas-200": {
      content: {
        "application/json": {
          areas: components["schemas"]["area-data"][];
        };
      };
    };
    /** @description ジャンル一覧取得成功 */
    "get-genres-200": {
      content: {
        "application/json": {
          genres: components["schemas"]["genre-data"][];
        };
      };
    };
    /** @description 飲食店一覧取得成功 */
    "get-shops-200": {
      content: {
        "application/json": components["schemas"]["pagination"] & {
          data: components["schemas"]["shop-data"][];
        };
      };
    };
    /** @description 飲食店情報取得成功 */
    "get-shop-200": {
      content: {
        "application/json": {
          data: components["schemas"]["shop-data"];
        };
      };
    };
    /** @description マイページのお気に入り一覧取得成功 */
    "get-customer-favorites-200": {
      content: {
        "application/json": components["schemas"]["pagination"] & {
          data: components["schemas"]["shop-data"][];
        };
      };
    };
    /** @description マイページの予約一覧取得成功 */
    "get-customer-reservations-200": {
      content: {
        "application/json": {
          data: components["schemas"]["reservation-data"][];
        };
      };
    };
    /** @description 飲食店詳細ページの予約一覧取得成功 */
    "get-customer-shop-reservations-200": {
      content: {
        "application/json": {
          reservations: components["schemas"]["reservation-data"][];
        };
      };
    };
    /** @description 飲食店詳細ページの予約追加成功 */
    "post-customer-shop-reservations-201": {
      content: {
        "application/json": {
          reservation: components["schemas"]["reservation-data"];
        };
      };
    };
    /** @description 飲食店詳細ページの予約追加のバリデーションエラー */
    "post-customer-shop-reservations-422": {
      content: {
        "application/json": components["schemas"]["reservation-error"];
      };
    };
  };
  parameters: {
    /** @description 顧客ID */
    "customer-id": number;
    /** @description 飲食店ID */
    "shop-id": number;
    /** @description 予約ID */
    "reservation-id": number;
    /** @description エリアID */
    "area-query"?: number;
    /** @description ジャンルID */
    "genre-query"?: number;
    /** @description 店名検索キーワード */
    "search-query"?: string;
    /** @description ページ番号 */
    "page-query"?: number;
  };
  requestBodies: {
    /** @description 顧客登録リクエスト */
    "post-auth-register": {
      content: {
        "application/json": {
          /**
           * @description 顧客名
           * @example テストユーザー
           */
          name: string;
          /**
           * Format: email
           * @description メールアドレス
           * @example test@example.com
           */
          email: string;
          /**
           * @description パスワード
           * @example password
           */
          password: string;
        };
      };
    };
    /** @description ログインリクエスト */
    "post-auth-login": {
      content: {
        "application/json": {
          /**
           * Format: email
           * @description メールアドレス
           * @example test@example.com
           */
          email: string;
          /**
           * @description パスワード
           * @example password
           */
          password: string;
        };
      };
    };
    /** @description 予約追加リクエスト */
    "post-customer-shop-reservations": {
      content: {
        "application/json": {
          /**
           * Format: date-time
           * @description 予約日時
           * @example 2021-12-31T23:59:59+09:00
           */
          reserved_at: string;
          /**
           * @description 予約人数
           * @example 2
           */
          number_of_guests: number;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /**
   * エリア一覧取得
   * @description エリア一覧を取得する
   */
  "get-areas": {
    responses: {
      200: components["responses"]["get-areas-200"];
    };
  };
  /**
   * 認証状態取得
   * @description 認証状態を取得する
   */
  "get-auth-status": {
    responses: {
      200: components["responses"]["get-auth-status-200"];
    };
  };
  /**
   * 顧客情報取得
   * @description セッション中の顧客情報を取得する
   */
  "get-customer": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
      };
    };
    responses: {
      200: components["responses"]["show-customer-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  /**
   * マイページでのお気に入り一覧取得機能
   * @description セッション中の顧客がお気に入り登録している飲食店の一覧を取得する
   */
  "get-customer-favorites": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
      };
    };
    responses: {
      200: components["responses"]["get-customer-favorites-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  /**
   * マイページでの予約一覧取得機能
   * @description セッション中の顧客が行っている予約の一覧を取得する
   */
  "get-customer-reservations": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
      };
    };
    responses: {
      200: components["responses"]["get-customer-reservations-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  /**
   * マイページでの予約取り消し機能
   * @description セッション中の顧客が指定の飲食店で行っている指定の予約を取り消す
   */
  "delete-customer-reservations": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
        reservation: components["parameters"]["reservation-id"];
      };
    };
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  /**
   * お気に入り登録
   * @description セッション中の顧客が指定の飲食店をお気に入り登録する
   */
  "post-customer-shop-favorite": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
        shop: components["parameters"]["shop-id"];
      };
    };
    responses: {
      201: components["responses"]["created"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["unprocessable-entity"];
    };
  };
  /**
   * お気に入り解除
   * @description セッション中の顧客が指定の飲食店のお気に入りを解除する
   */
  "delete-customer-shop-favorite": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
        shop: components["parameters"]["shop-id"];
      };
    };
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["unprocessable-entity"];
    };
  };
  /**
   * 飲食店詳細ページでの予約一覧取得機能
   * @description セッション中の顧客が指定の飲食店で行っている予約を一覧取得する
   */
  "get-customer-shop-reservations": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
        shop: components["parameters"]["shop-id"];
      };
    };
    responses: {
      200: components["responses"]["get-customer-shop-reservations-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  /**
   * 飲食店詳細ページでの予約追加機能
   * @description セッション中の顧客が指定の飲食店で予約を追加する
   */
  "post-customer-shop-reservations": {
    parameters: {
      path: {
        customer: components["parameters"]["customer-id"];
        shop: components["parameters"]["shop-id"];
      };
    };
    requestBody: components["requestBodies"]["post-customer-shop-reservations"];
    responses: {
      201: components["responses"]["post-customer-shop-reservations-201"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["post-customer-shop-reservations-422"];
    };
  };
  /**
   * ジャンル一覧取得
   * @description ジャンル一覧を取得する
   */
  "get-genres": {
    responses: {
      200: components["responses"]["get-genres-200"];
    };
  };
  /**
   * 飲食店一覧取得
   * @description 飲食店一覧を取得する
   */
  "get-shops": {
    parameters: {
      query?: {
        area?: components["parameters"]["area-query"];
        genre?: components["parameters"]["genre-query"];
        search?: components["parameters"]["search-query"];
        page?: components["parameters"]["page-query"];
      };
    };
    responses: {
      200: components["responses"]["get-shops-200"];
    };
  };
  /**
   * 飲食店情報取得
   * @description 飲食店情報を個別に取得する
   */
  "get-shop": {
    parameters: {
      path: {
        shop: components["parameters"]["shop-id"];
      };
    };
    responses: {
      200: components["responses"]["get-shop-200"];
      404: components["responses"]["not-found"];
    };
  };
  /**
   * CSRFトークン取得
   * @description CSRFトークンを取得する
   */
  "get-sanctum-csrf-cookie": {
    responses: {
      204: components["responses"]["get-sanctum-csrf-cookie-204"];
    };
  };
  /**
   * 顧客登録
   * @description 顧客を新規登録する
   */
  "post-auth-register": {
    requestBody: components["requestBodies"]["post-auth-register"];
    responses: {
      201: components["responses"]["created"];
      204: components["responses"]["no-content"];
      422: components["responses"]["post-auth-register-422"];
    };
  };
  /**
   * ログイン
   * @description 顧客のログイン処理を行う
   */
  "post-auth-login": {
    requestBody: components["requestBodies"]["post-auth-login"];
    responses: {
      200: components["responses"]["ok"];
      204: components["responses"]["no-content"];
      422: components["responses"]["post-auth-login-422"];
    };
  };
  /**
   * ログアウト
   * @description 顧客のログアウト処理を行う
   */
  "post-auth-logout": {
    responses: {
      204: components["responses"]["no-content"];
    };
  };
}
