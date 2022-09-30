import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message } from '../room/dtos/room.dto';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true, type: [String] })
  users: string[];

  @Prop({ required: true })
  messages: Message[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
