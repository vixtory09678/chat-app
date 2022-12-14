import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserLoginDto, UserRegisterDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../user/dtos/user.dto';
import { genHexColor } from '../utils/generate-unique';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(private prismaService: PrismaService) {}

  async login(loginDto: UserLoginDto) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          username: loginDto.username,
        },
      });

      const isMatch = await bcrypt.compare(loginDto.password, user?.password);

      if (!isMatch) {
        throw new Error('Incorrect username or password');
      }

      return plainToInstance(UserResponse, user);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async logout(sid: string) {
    try {
      await this.prismaService.session.delete({
        where: { id: sid },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async register(registerDto: UserRegisterDto) {
    try {
      const foundUser = await this.prismaService.user.findUnique({
        where: { username: registerDto.username },
      });

      if (foundUser) {
        throw new Error(`User ${foundUser.username} already exists`);
      }

      const ROUNDS = 10;
      const hash = await bcrypt.hash(registerDto.password, ROUNDS);

      await this.prismaService.user.create({
        data: {
          username: registerDto.username,
          password: hash,
          displayName: registerDto.username,
          profileColor: genHexColor(),
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
