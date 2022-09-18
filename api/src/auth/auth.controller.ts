import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
  async login(loginDto: UserLoginDto) {
    await this.authService.login(loginDto);
  }
}
