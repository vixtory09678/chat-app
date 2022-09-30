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

export interface CreateRoomDto {
  participants: UserResponse[];
}

export interface RoomResponse {
  roomId: string;
  roomName: string;
  participants: UserResponse[];

  /** @format date-time */
  updatedAt: string;
  roomProfileColor: string | null;
  roomProfileImageUrl: string | null;
  lastMessage: string | null;
}

export interface Message {
  id: string;
  to: string;
  text: string;
  from: string;

  /** @format date-time */
  createdAt: string;
}

export interface ChatRoomResponse {
  roomId: string;
  participants: UserResponse[];
  messages: Message[];
}
