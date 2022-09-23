import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UserResponse } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [UserResponse] })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: UserResponse })
  getUserProfile(@Param('id') id: string) {
    return this.userService.getUserProfile(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserDto, required: true })
  @ApiOkResponse({ type: UserResponse })
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }
}
