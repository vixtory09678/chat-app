import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SessionBody } from '../types';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegisterDto } from './dtos/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: UserRegisterDto, required: true })
  @ApiCreatedResponse()
  async register(registerDto: UserRegisterDto) {
    await this.authService.register(registerDto);
  }

  @Post('/login')
  @ApiBody({ type: UserLoginDto, required: true })
  async login(@Session() session: SessionBody, loginDto: UserLoginDto) {
    session.username = loginDto.username;
    await this.authService.login(loginDto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async logout(@Session() session: Record<string, any>) {
    this.authService.logout(session.sid);
    session.destroy();
  }
}
