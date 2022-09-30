import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { PrismaService } from '../prisma/prisma.service';
import { Room } from '../room-message/room-message.schema';
import { UserResponse } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';
import { genHexColor } from '../utils/generate-unique';
import { ChatRoomResponse, RoomResponse } from './dtos/room.dto';
import * as _ from 'lodash';

@Injectable()
export class RoomService {
  logger = new Logger(RoomService.name);

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    @InjectModel(Room.name) private roomModel: Model<Room>,
  ) {}

  /**
   * It creates a new room with the specified participants and returns the created room
   * @param {string} userId - The userId of the user who is creating the room.
   * @param {UserResponse[]} participants - UserResponse[]
   * @returns A room response object
   */
  async createRoom(userId: string, participants: UserResponse[]) {
    try {
      if (!participants?.length)
        throw new Error('Participants must be specified');

      const profile = await this.userService.getUserProfile(userId);

      const roomName =
        participants.length > 1
          ? [
              profile.displayName,
              ...participants.map((user) => user.displayName),
            ].join(', ')
          : participants[0].displayName;

      const createdRoom = await this.prismaService.chatRoom.create({
        data: {
          roomName,
          users: {
            connect: [
              { id: userId },
              ...participants.map((user) => ({ id: user.id })),
            ],
          },
          roomProfileColor: genHexColor(),
        },
        include: {
          users: true,
        },
      });

      await this.roomModel.create({
        roomId: createdRoom.id,
        users: createdRoom.users.map((user) => user.id),
      });

      return plainToInstance(RoomResponse, {
        ...createdRoom,
        users: createdRoom.users.filter((user) => user.id !== userId),
      });
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }

  /**
   * It finds a user by id, and then returns the chatRooms that the user is a part of
   * @param {string} userId - string
   * @returns An array of rooms
   */
  async getRooms(userId: string) {
    try {
      const userRoom = await this.prismaService.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        include: {
          chatRooms: {
            include: { users: true },
            orderBy: { updatedAt: 'desc' },
          },
        },
      });
      const userRoomWithAddedLastMessage = await Promise.all(
        userRoom.chatRooms.map(async (room) => {
          const chat = await this.roomModel.findOne({ roomId: room.id });
          return {
            ...room,
            lastMessage: _.last(chat?.messages)?.text,
          };
        }),
      );

      return plainToInstance(RoomResponse, userRoomWithAddedLastMessage);
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }

  /**
   * It gets a chat room by its id, and returns a ChatRoomResponse object with the users array filtered
   * to remove the userId passed in
   * @param {string} userId - The userId of the user who is requesting the chat room.
   * @param {string} roomId - The id of the room you want to get.
   * @returns The chat room with the messages and the users that are not the user that is requesting
   * the chat room.
   */
  async getChatRoom(userId: string, roomId: string) {
    try {
      const chatRoom = await this.roomModel.findOne({ roomId }).exec();
      const roomToBeReplied = plainToInstance(ChatRoomResponse, {
        roomId: chatRoom.roomId,
        messages: [...chatRoom.messages],
        users: chatRoom.users.filter((id) => id !== userId),
      });

      return roomToBeReplied;
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }
}
