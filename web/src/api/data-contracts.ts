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

export interface UserRegisterDto {
  username: string;
  password: string;
}

export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserResponse {
  id: string;
  username: string;
  displayName: string;
  profileImageUrl: string | null;
  profileColor: string;
}

export interface UpdateUserDto {
  displayName: string;
}
