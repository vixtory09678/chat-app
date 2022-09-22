/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { UserLoginDto, UserRegisterDto } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags health
   * @name AppControllerGetHealth
   * @request GET:/api/health/health
   * @response `200` `void`
   */
  appControllerGetHealth = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/health/health`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerRegister
   * @request POST:/api/auth/register
   * @response `201` `void`
   */
  authControllerRegister = (
    data: UserRegisterDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/auth/register`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogin
   * @request POST:/api/auth/login
   * @response `200` `void`
   */
  authControllerLogin = (data: UserLoginDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogout
   * @request POST:/api/auth/logout
   * @response `200` `void`
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth/logout`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerTestSession
   * @request GET:/api/auth/test_session
   * @response `200` `void`
   */
  authControllerTestSession = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/auth/test_session`,
      method: 'GET',
      ...params,
    });
}
