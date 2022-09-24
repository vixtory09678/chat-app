import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto, UserResponse } from './dtos/user.dto';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    try {
      const users = await this.prismaService.user.findMany();
      return plainToInstance(UserResponse, users);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getUserProfile(id: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { id },
      });
      return plainToInstance(UserResponse, user);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: string, user: UpdateUserDto) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          ...user,
        },
      });
      return plainToInstance(UserResponse, updatedUser);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
