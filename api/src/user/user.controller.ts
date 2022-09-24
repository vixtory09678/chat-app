import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../auth/guard/UserGuard';
import { UserApp, UserType } from '../decorators/user.decorator';
import { UpdateUserDto, UserResponse } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('user')
@UseGuards(UserGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [UserResponse] })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserResponse })
  getUserProfile(@UserApp() user: UserType) {
    return this.userService.getUserProfile(user.userId);
  }

  @Put('/profile')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateUserDto, required: true })
  @ApiOkResponse({ type: UserResponse })
  updateUser(@UserApp() user: UserType, @Body() updateUser: UpdateUserDto) {
    return this.userService.updateUser(user.userId, updateUser);
  }
}
