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
  "/customers/{user}": {
    /**
     * 会員情報取得
     * @description ユーザー(一般会員)の情報を取得する
     */
    get: operations["get-customer"];
  };
  "/customers/{user}/shops/{shop}/favorite": {
    /**
     * お気に入り登録
     * @description ユーザー(一般会員)が飲食店をお気に入り登録する
     */
    post: operations["post-customer-shop-favorite"];
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
  "/sanctum/csrf-cookie": {
    /**
     * CSRFトークン取得
     * @description CSRFトークンを取得する
     */
    get: operations["get-sanctum-csrf-cookie"];
  };
  "/auth/register": {
    /**
     * 会員登録
     * @description ユーザー(一般会員)を新規登録する
     */
    post: operations["post-auth-register"];
  };
  "/auth/login": {
    /**
     * ログイン
     * @description ユーザー(一般会員)のログイン処理を行う
     */
    post: operations["post-auth-login"];
  };
  "/auth/logout": {
    /**
     * ログアウト
     * @description ユーザー(一般会員)のログアウト処理を行う
     */
    post: operations["post-auth-logout"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description ページネーション */
    pagination: {
      /** @description ページネーションメタ情報 */
      meta: {
        /** @description 現在のページ番号 */
        current_page: number;
        /** @description 現在のページの最初のレコード番号 */
        from: null | number;
        /** @description 最終ページ番号 */
        last_page: number;
        /** @description ページネーションリンク */
        links: {
          /** @description リンクURL */
          url: null | string;
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
        to: null | number;
        /** @description 総件数 */
        total: number;
      };
      /** @description ページネーションリンク */
      links: {
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
        /** @description 前のページのURL */
        prev: null | string;
        /** @description 次のページのURL */
        next: null | string;
      };
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
    /** @description バリデーションエラーまたはメールアドレスが登録済み */
    "post-auth-register-422": {
      content: {
        "application/json": {
          message: string;
          errors: {
            name?: string[];
            email?: string[];
            password?: string[];
          };
        };
      };
    };
    /** @description バリデーションエラーまたは未登録 */
    "post-auth-login-422": {
      content: {
        "application/json": {
          message: string;
          errors: {
            email?: string[];
            password?: string[];
          };
        };
      };
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
    /** @description エリア一覧取得成功 */
    "get-areas-200": {
      content: {
        "application/json": {
          areas: {
            /** Format: int64 */
            id: number;
            name: string;
          }[];
        };
      };
    };
    /** @description ジャンル一覧取得成功 */
    "get-genres-200": {
      content: {
        "application/json": {
          genres: {
            /** Format: int64 */
            id: number;
            name: string;
          }[];
        };
      };
    };
    /** @description 飲食店一覧取得成功 */
    "get-shops-200": {
      content: {
        "application/json": components["schemas"]["pagination"] & {
          data: {
            /** Format: int64 */
            id: number;
            name: string;
            area: {
              /** Format: int64 */
              id: number;
              name: string;
            };
            genre: {
              /** Format: int64 */
              id: number;
              name: string;
            };
            /** Format: uri */
            image_url: string;
            /** @enum {string} */
            favorite_status: "unknown" | "marked" | "unmarked";
          }[];
        };
      };
    };
  };
  parameters: {
    /** @description ユーザーID */
    "user-id": number;
    /** @description 飲食店ID */
    "shop-id": number;
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
    /** @description ユーザー登録リクエスト */
    "post-auth-register": {
      content: {
        "application/json": {
          /**
           * @description ユーザー名
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
   * 会員情報取得
   * @description ユーザー(一般会員)の情報を取得する
   */
  "get-customer": {
    parameters: {
      path: {
        user: components["parameters"]["user-id"];
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
   * お気に入り登録
   * @description ユーザー(一般会員)が飲食店をお気に入り登録する
   */
  "post-customer-shop-favorite": {
    parameters: {
      path: {
        user: components["parameters"]["user-id"];
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
   * CSRFトークン取得
   * @description CSRFトークンを取得する
   */
  "get-sanctum-csrf-cookie": {
    responses: {
      204: components["responses"]["get-sanctum-csrf-cookie-204"];
    };
  };
  /**
   * 会員登録
   * @description ユーザー(一般会員)を新規登録する
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
   * @description ユーザー(一般会員)のログイン処理を行う
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
   * @description ユーザー(一般会員)のログアウト処理を行う
   */
  "post-auth-logout": {
    responses: {
      204: components["responses"]["no-content"];
    };
  };
}
