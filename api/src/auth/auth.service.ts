import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserLoginDto, UserRegisterDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(private prismaService: PrismaService) {}

  async login(loginDto: UserLoginDto) {
    try {
      const { password: hashedPassword } =
        await this.prismaService.user.findUnique({
          where: {
            username: loginDto.username,
          },
        });

      const isMatch = await bcrypt.compare(loginDto.password, hashedPassword);

      if (!isMatch) {
        throw new Error('Incorrect username or password');
      }
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async logout(sid: string) {
    try {
      await this.prismaService.session.delete({
        where: { id: sid },
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async register(registerDto: UserRegisterDto) {
    const ROUNDS = 10;
    const hash = await bcrypt.hash(registerDto.password, ROUNDS);

    await this.prismaService.user.create({
      data: {
        username: registerDto.username,
        password: hash,
        displayName: registerDto.username,
      },
    });
  }
}
