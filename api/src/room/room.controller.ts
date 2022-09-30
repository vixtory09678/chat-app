import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../auth/guard/UserGuard';
import { UserApp, UserType } from '../decorators/user.decorator';
import { UserResponse } from '../user/dtos/user.dto';
import { ChatRoomResponse, CreateRoomDto, RoomResponse } from './dtos/room.dto';
import { RoomService } from './room.service';

@Controller('rooms')
@ApiTags('rooms')
@UseGuards(UserGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateRoomDto })
  @ApiOkResponse({ type: RoomResponse })
  async createRoom(
    @UserApp() user: UserType,
    @Body('participants') participants: UserResponse[],
  ) {
    return this.roomService.createRoom(user.userId, participants);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [RoomResponse] })
  async getRooms(@UserApp() user: UserType) {
    return this.roomService.getRooms(user.userId);
  }

  @Get('/:roomId/chat')
  @ApiParam({ name: 'roomId', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ChatRoomResponse })
  async getChatRoom(
    @UserApp() user: UserType,
    @Param('roomId') roomId: string,
  ) {
    return this.roomService.getChatRoom(user.userId, roomId);
  }
}
