import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { SessionBody } from '../types';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegisterDto } from './dtos/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: UserRegisterDto,
    required: true,
  })
  @ApiCreatedResponse()
  async register(@Body() registerDto: UserRegisterDto) {
    await this.authService.register(registerDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserLoginDto, required: true })
  @ApiOkResponse()
  async login(@Session() session: SessionBody, @Body() loginDto: UserLoginDto) {
    session.username = loginDto.username;
    await this.authService.login(loginDto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async logout(@Session() session: Record<string, any>) {
    await this.authService.logout(session.id);
    session.destroy();
  }

  @Get('/test_session')
  testSession(
    @Session() session: Record<string, any>,
    @Req() request: Request,
  ) {
    console.log('session', session);
    console.log('request', request.headers, request.session, request.cookies);
  }
}
