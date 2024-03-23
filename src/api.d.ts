/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/areas": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * エリア一覧取得
     * @description エリア一覧を取得する
     */
    get: operations["get-areas"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/status": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 認証状態取得
     * @description 認証状態を取得する
     */
    get: operations["get-auth-status"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/customers/{customer}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 顧客情報取得
     * @description セッション中の顧客情報を取得する
     */
    get: operations["get-customer"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/customers/{customer}/favorites": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * マイページでのお気に入り一覧取得機能
     * @description セッション中の顧客がお気に入り登録している飲食店の一覧を取得する
     */
    get: operations["get-customer-favorites"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/customers/{customer}/reservations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * マイページでの予約一覧取得機能
     * @description セッション中の顧客が行っている予約の一覧を取得する
     */
    get: operations["get-customer-reservations"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/customers/{customer}/reservations/{reservation}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /**
     * マイページでの予約変更機能
     * @description セッション中の顧客が行っている指定の予約を変更する
     */
    put: operations["put-customer-reservation"];
    post?: never;
    /**
     * マイページでの予約取り消し機能
     * @description セッション中の顧客が指定の飲食店で行っている指定の予約を取り消す
     */
    delete: operations["delete-customer-reservations"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/customers/{customer}/shops/{shop}/favorite": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
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
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/customers/{customer}/shops/{shop}/reservations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 飲食店詳細ページでの予約一覧取得機能
     * @description セッション中の顧客が指定の飲食店で行っている予約を一覧取得する
     */
    get: operations["get-customer-shop-reservations"];
    put?: never;
    /**
     * 飲食店詳細ページでの予約追加機能
     * @description セッション中の顧客が指定の飲食店で予約を追加する
     */
    post: operations["post-customer-shop-reservations"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/genres": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * ジャンル一覧取得
     * @description ジャンル一覧を取得する
     */
    get: operations["get-genres"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/notification-email": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * お知らせメール送信
     * @description お知らせメールをすべての顧客に対して送信する
     */
    post: operations["post-notification-email"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/owners": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 店舗代表者追加
     * @description 店舗代表者アカウントを追加する
     */
    post: operations["post-owners"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/owners/{owner}/shops": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 店舗代表者別店舗一覧取得
     * @description 店舗代表者が作成した飲食店情報の一覧を取得する
     */
    get: operations["get-owner-shops"];
    put?: never;
    /**
     * 店舗代表者別店舗登録
     * @description 店舗代表者が飲食店情報を登録する
     */
    post: operations["post-owner-shops"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/owners/{owner}/shops/{shop}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /**
     * 店舗代表者別店舗更新
     * @description 店舗代表者が飲食店情報を更新する
     */
    put: operations["put-owner-shop"];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/owners/{owner}/shops/{shop}/reservations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 店舗代表者向け飲食店別予約一覧取得
     * @description 店舗代表者と飲食店を指定して予約一覧を取得する
     */
    get: operations["get-owner-shop-reservations"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/shops": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 飲食店一覧取得
     * @description 飲食店一覧を取得する
     */
    get: operations["get-shops"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/shops/{shop}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * 飲食店情報取得
     * @description 飲食店情報を個別に取得する
     */
    get: operations["get-shop"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/sanctum/csrf-cookie": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * CSRFトークン取得
     * @description CSRFトークンを取得する
     */
    get: operations["get-sanctum-csrf-cookie"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 顧客登録
     * @description 顧客を新規登録する
     */
    post: operations["post-auth-register"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/email/verification-notification": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * 確認メール送信
     * @description メールアドレス確認通知を登録メールアドレスに送信する
     */
    post: operations["post-auth-email-verification-notification"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/email/verify/{user}/{hash}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * メールアドレス確認
     * @description メールでの本人確認を行う
     */
    get: operations["get-auth-email-verify"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * ログイン
     * @description 顧客のログイン処理を行う
     */
    post: operations["post-auth-login"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * ログアウト
     * @description 顧客のログアウト処理を行う
     */
    post: operations["post-auth-logout"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    "auth-status":
      | components["schemas"]["auth-status-guest"]
      | components["schemas"]["auth-status-user"];
    "auth-status-guest": {
      /** @enum {string} */
      status: "guest";
    };
    "auth-status-user": {
      /** @enum {string} */
      status: "admin" | "owner" | "customer";
      /** Format: int64 */
      id: number;
      has_verified_email: boolean;
    };
    "notification-email-error": {
      message: string;
      errors: {
        title?: string[];
        body?: string[];
      };
    };
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
    /** @description 顧客向け飲食店情報 */
    "customer-shop-data": {
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
    /** @description 店舗代表者向け飲食店情報 */
    "owner-shop-data": {
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
    };
    /** @description 予約情報 */
    "reservation-data": {
      /**
       * Format: int64
       * @description 予約ID
       */
      id: number;
      shop: components["schemas"]["customer-shop-data"];
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
    "create-shop-error": {
      message: string;
      errors: {
        name?: string[];
        area?: string[];
        genre?: string[];
        image?: string[];
        detail?: string[];
      };
    };
    /** @description 店舗代表者向け飲食店別予約情報 */
    "reservation-for-owner": {
      /**
       * Format: int64
       * @description 予約ID
       */
      id: number;
      /** @description 顧客名 */
      customer_name: string;
      /**
       * Format: date-time
       * @description 予約日時
       */
      reserved_at: string;
      /** @description 予約人数 */
      number_of_guests: number;
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
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          /** @example テストユーザー */
          name: string;
        };
      };
    };
    /** @description リクエストが成功しリソースが見つかった */
    ok: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description リクエストが成功しリソースが作成された */
    created: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description リクエストが成功しリソースが存在しない */
    "no-content": {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description リクエストが成功しリソースが見つかった */
    found: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description 認証エラー */
    unauthorized: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description 認可エラー */
    forbidden: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description 指定されたリソースが存在しない */
    "not-found": {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description リクエストが競合している */
    conflict: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description リクエストが正しくない */
    "unprocessable-entity": {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description CSRFトークン取得成功 */
    "get-sanctum-csrf-cookie-204": {
      headers: {
        /** @description CSRFトークンをCookieにセット */
        "Set-Cookie": string;
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description 認証状態取得成功 */
    "get-auth-status-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["auth-status"];
      };
    };
    /** @description バリデーションエラーまたはメールアドレスが登録済み */
    "post-owners-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["register-error"];
      };
    };
    /** @description バリデーションエラー */
    "post-notification-email-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["notification-email-error"];
      };
    };
    /** @description バリデーションエラーまたはメールアドレスが登録済み */
    "post-auth-register-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["register-error"];
      };
    };
    /** @description バリデーションエラーまたは未登録 */
    "post-auth-login-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["login-error"];
      };
    };
    /** @description エリア一覧取得成功 */
    "get-areas-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          areas: components["schemas"]["area-data"][];
        };
      };
    };
    /** @description ジャンル一覧取得成功 */
    "get-genres-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          genres: components["schemas"]["genre-data"][];
        };
      };
    };
    /** @description 飲食店一覧取得成功 */
    "get-shops-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["pagination"] & {
          data: components["schemas"]["customer-shop-data"][];
        };
      };
    };
    /** @description 飲食店情報取得成功 */
    "get-shop-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          data: components["schemas"]["customer-shop-data"];
        };
      };
    };
    /** @description マイページのお気に入り一覧取得成功 */
    "get-customer-favorites-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["pagination"] & {
          data: components["schemas"]["customer-shop-data"][];
        };
      };
    };
    /** @description マイページの予約一覧取得成功 */
    "get-customer-reservations-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          data: components["schemas"]["reservation-data"][];
        };
      };
    };
    /** @description 飲食店詳細ページの予約一覧取得成功 */
    "get-customer-shop-reservations-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          reservations: components["schemas"]["reservation-data"][];
        };
      };
    };
    /** @description 飲食店詳細ページの予約追加成功 */
    "post-customer-shop-reservations-201": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          reservation: components["schemas"]["reservation-data"];
        };
      };
    };
    /** @description 飲食店詳細ページの予約追加のバリデーションエラー */
    "post-customer-shop-reservations-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["reservation-error"];
      };
    };
    /** @description マイページの予約変更のバリデーションエラー */
    "put-customer-reservation-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["reservation-error"];
      };
    };
    /** @description 店舗代表者別店舗一覧取得成功 */
    "get-owner-shops-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          data: components["schemas"]["owner-shop-data"][];
        };
      };
    };
    /** @description 店舗代表者別店舗登録成功 */
    "post-owner-shops-201": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          data: components["schemas"]["owner-shop-data"];
        };
      };
    };
    /** @description 店舗代表者別店舗登録のバリデーションエラー */
    "post-owner-shops-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["create-shop-error"];
      };
    };
    /** @description 店舗代表者別店舗更新のバリデーションエラー */
    "put-owner-shop-422": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["create-shop-error"];
      };
    };
    /** @description 店舗代表者向け飲食店別予約一覧取得成功 */
    "get-owner-shop-reservations-200": {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["pagination"] & {
          data: components["schemas"]["reservation-for-owner"][];
        };
      };
    };
  };
  parameters: {
    /** @description ユーザーID */
    "user-id": number;
    /** @description ハッシュ値 */
    hash: string;
    /** @description 顧客ID */
    "customer-id": number;
    /** @description 飲食店ID */
    "shop-id": number;
    /** @description 予約ID */
    "reservation-id": number;
    /** @description オーナーID */
    "owner-id": number;
    /** @description エリアID */
    "area-query": number;
    /** @description ジャンルID */
    "genre-query": number;
    /** @description 店名検索キーワード */
    "search-query": string;
    /** @description ページ番号 */
    "page-query": number;
  };
  requestBodies: {
    /** @description 店舗代表者追加リクエスト */
    "post-owners": {
      content: {
        "application/json": {
          /**
           * @description 店舗代表者名
           * @example テストオーナー
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
    /** @description お知らせメール送信リクエスト */
    "post-notification-email": {
      content: {
        "application/json": {
          /**
           * @description タイトル
           * @example タイトル
           */
          title: string;
          /**
           * @description 本文
           * @example 本文
           */
          body: string;
        };
      };
    };
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
    /** @description 予約変更リクエスト */
    "put-customer-reservation": {
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
    /** @description 店舗代表者別店舗登録リクエスト */
    "post-owner-shops": {
      content: {
        "multipart/form-data": {
          /**
           * @description 店舗名
           * @example テスト店舗
           */
          name: string;
          /**
           * @description エリア
           * @example テストエリア
           */
          area: string;
          /**
           * @description ジャンル
           * @example テストジャンル
           */
          genre: string;
          /**
           * Format: binary
           * @description 画像
           */
          image: string;
          /**
           * @description 詳細
           * @example テスト詳細
           */
          detail: string;
        };
      };
    };
    /** @description 店舗代表者別店舗更新リクエスト */
    "put-owner-shop": {
      content: {
        "multipart/form-data": {
          /**
           * @description 店舗名
           * @example テスト店舗
           */
          name: string;
          /**
           * @description エリア
           * @example テストエリア
           */
          area: string;
          /**
           * @description ジャンル
           * @example テストジャンル
           */
          genre: string;
          /**
           * Format: binary
           * @description 画像
           */
          image?: string;
          /**
           * @description 詳細
           * @example テスト詳細
           */
          detail: string;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  "get-areas": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-areas-200"];
    };
  };
  "get-auth-status": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-auth-status-200"];
    };
  };
  "get-customer": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["show-customer-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "get-customer-favorites": {
    parameters: {
      query?: {
        /** @description ページ番号 */
        page?: components["parameters"]["page-query"];
      };
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-customer-favorites-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "get-customer-reservations": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-customer-reservations-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "put-customer-reservation": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
        /** @description 予約ID */
        reservation: components["parameters"]["reservation-id"];
      };
      cookie?: never;
    };
    requestBody: components["requestBodies"]["put-customer-reservation"];
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["put-customer-reservation-422"];
    };
  };
  "delete-customer-reservations": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
        /** @description 予約ID */
        reservation: components["parameters"]["reservation-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "post-customer-shop-favorite": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
        /** @description 飲食店ID */
        shop: components["parameters"]["shop-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      201: components["responses"]["created"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["unprocessable-entity"];
    };
  };
  "delete-customer-shop-favorite": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
        /** @description 飲食店ID */
        shop: components["parameters"]["shop-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["unprocessable-entity"];
    };
  };
  "get-customer-shop-reservations": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
        /** @description 飲食店ID */
        shop: components["parameters"]["shop-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-customer-shop-reservations-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "post-customer-shop-reservations": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 顧客ID */
        customer: components["parameters"]["customer-id"];
        /** @description 飲食店ID */
        shop: components["parameters"]["shop-id"];
      };
      cookie?: never;
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
  "get-genres": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-genres-200"];
    };
  };
  "post-notification-email": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: components["requestBodies"]["post-notification-email"];
    responses: {
      201: components["responses"]["created"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      422: components["responses"]["post-notification-email-422"];
    };
  };
  "post-owners": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: components["requestBodies"]["post-owners"];
    responses: {
      201: components["responses"]["created"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      422: components["responses"]["post-owners-422"];
    };
  };
  "get-owner-shops": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description オーナーID */
        owner: components["parameters"]["owner-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-owner-shops-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "post-owner-shops": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description オーナーID */
        owner: components["parameters"]["owner-id"];
      };
      cookie?: never;
    };
    requestBody: components["requestBodies"]["post-owner-shops"];
    responses: {
      201: components["responses"]["post-owner-shops-201"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["post-owner-shops-422"];
    };
  };
  "put-owner-shop": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description オーナーID */
        owner: components["parameters"]["owner-id"];
        /** @description 飲食店ID */
        shop: components["parameters"]["shop-id"];
      };
      cookie?: never;
    };
    requestBody: components["requestBodies"]["put-owner-shop"];
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
      422: components["responses"]["put-owner-shop-422"];
    };
  };
  "get-owner-shop-reservations": {
    parameters: {
      query?: {
        /** @description ページ番号 */
        page?: components["parameters"]["page-query"];
      };
      header?: never;
      path: {
        /** @description オーナーID */
        owner: components["parameters"]["owner-id"];
        /** @description 飲食店ID */
        shop: components["parameters"]["shop-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-owner-shop-reservations-200"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "get-shops": {
    parameters: {
      query?: {
        /** @description エリアID */
        area?: components["parameters"]["area-query"];
        /** @description ジャンルID */
        genre?: components["parameters"]["genre-query"];
        /** @description 店名検索キーワード */
        search?: components["parameters"]["search-query"];
        /** @description ページ番号 */
        page?: components["parameters"]["page-query"];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-shops-200"];
    };
  };
  "get-shop": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description 飲食店ID */
        shop: components["parameters"]["shop-id"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: components["responses"]["get-shop-200"];
      404: components["responses"]["not-found"];
    };
  };
  "get-sanctum-csrf-cookie": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: components["responses"]["get-sanctum-csrf-cookie-204"];
    };
  };
  "post-auth-register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: components["requestBodies"]["post-auth-register"];
    responses: {
      201: components["responses"]["created"];
      204: components["responses"]["no-content"];
      422: components["responses"]["post-auth-register-422"];
    };
  };
  "post-auth-email-verification-notification": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
    };
  };
  "get-auth-email-verify": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ユーザーID */
        user: components["parameters"]["user-id"];
        /** @description ハッシュ値 */
        hash: components["parameters"]["hash"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: components["responses"]["no-content"];
      401: components["responses"]["unauthorized"];
      403: components["responses"]["forbidden"];
      404: components["responses"]["not-found"];
    };
  };
  "post-auth-login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: components["requestBodies"]["post-auth-login"];
    responses: {
      200: components["responses"]["ok"];
      204: components["responses"]["no-content"];
      422: components["responses"]["post-auth-login-422"];
    };
  };
  "post-auth-logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: components["responses"]["no-content"];
    };
  };
}
