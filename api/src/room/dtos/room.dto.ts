import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsArray } from 'class-validator';
import { UserResponse } from '../../user/dtos/user.dto';

export class CreateRoomDto {
  @IsArray()
  @ApiProperty({ type: [UserResponse] })
  participants: UserResponse[];
}

@Exclude()
export class RoomResponse {
  users: UserResponse[];
  id: string;

  @Expose()
  @Transform(({ obj }: { obj: RoomResponse }) => obj.id)
  @ApiProperty()
  roomId: string;

  @Expose()
  @ApiProperty()
  roomName: string;

  @Expose()
  @Transform(({ obj }: { obj: RoomResponse }) => [...obj.users])
  @ApiProperty({ type: [UserResponse] })
  participants: UserResponse[];

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ nullable: true })
  roomProfileColor?: string;

  @Expose()
  @ApiProperty({ nullable: true })
  roomProfileImageUrl?: string;

  @Expose()
  @ApiProperty({ type: String, nullable: true })
  lastMessage?: string;
}

@Exclude()
export class Message {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  to: string;

  @Expose()
  @ApiProperty()
  text: string;

  @Expose()
  @ApiProperty()
  from: string;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

@Exclude()
export class ChatRoomResponse {
  users: UserResponse[];
  id: string;

  @Expose()
  @ApiProperty()
  roomId: string;

  @Expose()
  @Transform(({ obj }: { obj: RoomResponse }) => [...obj.users])
  @ApiProperty({ type: [UserResponse] })
  participants: UserResponse[];

  @Expose()
  @ApiProperty({ type: [Message] })
  messages: Message[];
}
