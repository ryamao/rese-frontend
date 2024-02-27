/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Rese
 * Rese API
 * OpenAPI spec version: 0.0.1
 */
import * as axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  CreatedResponse,
  GetSanctumCsrfCookie204Response,
  NoContentResponse,
  OkResponse,
  PostAuthLoginBody,
  PostAuthRegisterBody
} from '../models'
import {
  faker
} from '@faker-js/faker'
import {
  HttpResponse,
  delay,
  http
} from 'msw'
import type {
  ShowCustomer200Response
} from '../models'




  /**
 * ユーザー(一般会員)の情報を取得する
 * @summary 会員情報取得
 */
export const getCustomer = <TData = AxiosResponse<ShowCustomer200Response>>(
    user: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `/customers/${user}`,options
    );
  }

/**
 * CSRFトークンを取得する
 * @summary CSRFトークン取得
 */
export const getSanctumCsrfCookie = <TData = AxiosResponse<GetSanctumCsrfCookie204Response>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `/sanctum/csrf-cookie`,options
    );
  }

/**
 * ユーザー(一般会員)を新規登録する
 * @summary 会員登録
 */
export const postAuthRegister = <TData = AxiosResponse<CreatedResponse | NoContentResponse>>(
    postAuthRegisterBody: PostAuthRegisterBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.post(
      `/auth/register`,
      postAuthRegisterBody,options
    );
  }

/**
 * ユーザー(一般会員)のログイン処理を行う
 * @summary ログイン
 */
export const postAuthLogin = <TData = AxiosResponse<OkResponse | NoContentResponse>>(
    postAuthLoginBody: PostAuthLoginBody, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.post(
      `/auth/login`,
      postAuthLoginBody,options
    );
  }

export type GetCustomerResult = AxiosResponse<ShowCustomer200Response>
export type GetSanctumCsrfCookieResult = AxiosResponse<GetSanctumCsrfCookie204Response>
export type PostAuthRegisterResult = AxiosResponse<CreatedResponse | NoContentResponse>
export type PostAuthLoginResult = AxiosResponse<OkResponse | NoContentResponse>


export const getGetCustomerResponseMock = (overrideResponse: any = {}): ShowCustomer200Response => ({name: faker.word.sample(), ...overrideResponse})


export const getGetCustomerMockHandler = (overrideResponse?: ShowCustomer200Response) => {
  return http.get('*/customers/:user', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(overrideResponse ? overrideResponse : getGetCustomerResponseMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  })
}

export const getGetSanctumCsrfCookieMockHandler = () => {
  return http.get('*/sanctum/csrf-cookie', async () => {
    await delay(1000);
    return new HttpResponse(null,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  })
}

export const getPostAuthRegisterMockHandler = () => {
  return http.post('*/auth/register', async () => {
    await delay(1000);
    return new HttpResponse(null,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  })
}

export const getPostAuthLoginMockHandler = () => {
  return http.post('*/auth/login', async () => {
    await delay(1000);
    return new HttpResponse(null,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  })
}
export const getReseMock = () => [
  getGetCustomerMockHandler(),
  getGetSanctumCsrfCookieMockHandler(),
  getPostAuthRegisterMockHandler(),
  getPostAuthLoginMockHandler()]
