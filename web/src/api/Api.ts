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

import {
  ChatRoomResponse,
  CreateRoomDto,
  RoomResponse,
  UpdateUserDto,
  UserLoginDto,
  UserRegisterDto,
  UserResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags health
   * @name AppControllerGetHealth
   * @request GET:/api/health
   * @response `200` `void`
   */
  appControllerGetHealth = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/health`,
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
  authControllerRegister = (data: UserRegisterDto, params: RequestParams = {}) =>
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
   * @response `200` `UserResponse`
   */
  authControllerLogin = (data: UserLoginDto, params: RequestParams = {}) =>
    this.request<UserResponse, any>({
      path: `/api/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
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
  /**
   * No description
   *
   * @tags user
   * @name UserControllerGetUsers
   * @request GET:/api/users
   * @response `200` `(UserResponse)[]`
   */
  userControllerGetUsers = (params: RequestParams = {}) =>
    this.request<UserResponse[], any>({
      path: `/api/users`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserControllerGetUserProfile
   * @request GET:/api/users/profile
   * @response `200` `UserResponse`
   */
  userControllerGetUserProfile = (params: RequestParams = {}) =>
    this.request<UserResponse, any>({
      path: `/api/users/profile`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserControllerUpdateUser
   * @request PUT:/api/users/profile
   * @response `200` `UserResponse`
   */
  userControllerUpdateUser = (data: UpdateUserDto, params: RequestParams = {}) =>
    this.request<UserResponse, any>({
      path: `/api/users/profile`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags rooms
   * @name RoomControllerCreateRoom
   * @request POST:/api/rooms
   * @response `200` `RoomResponse`
   */
  roomControllerCreateRoom = (data: CreateRoomDto, params: RequestParams = {}) =>
    this.request<RoomResponse, any>({
      path: `/api/rooms`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags rooms
   * @name RoomControllerGetRooms
   * @request GET:/api/rooms
   * @response `200` `(RoomResponse)[]`
   */
  roomControllerGetRooms = (params: RequestParams = {}) =>
    this.request<RoomResponse[], any>({
      path: `/api/rooms`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags rooms
   * @name RoomControllerGetChatRoom
   * @request GET:/api/rooms/{roomId}/chat
   * @response `200` `ChatRoomResponse`
   */
  roomControllerGetChatRoom = (roomId: string, params: RequestParams = {}) =>
    this.request<ChatRoomResponse, any>({
      path: `/api/rooms/${roomId}/chat`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
