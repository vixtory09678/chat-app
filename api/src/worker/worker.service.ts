import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { MqttService, Payload, Subscribe } from 'nest-mqtt';
import { Room } from '../room-message/room-message.schema';
import { Message as MessageDto } from '../room/dtos/room.dto';

@Injectable()
export class WorkerService {
  constructor(
    private mqttService: MqttService,
    @InjectModel(Room.name) private roomModel: Model<Room>,
  ) {}

  @Subscribe('/rooms/chat')
  async messageHandler(@Payload() payload: MessageDto) {
    const messageToBeSent: MessageDto = {
      ...payload,
      createdAt: new Date(),
    };

    await this.mqttService.publish(
      `/rooms/${payload.to}/chat`,
      JSON.stringify(messageToBeSent),
    );
    await this.saveMessage(messageToBeSent, nanoid());
  }

  async saveMessage(message: MessageDto, id: string) {
    await this.roomModel
      .findOneAndUpdate(
        { roomId: message.to },
        {
          $push: {
            messages: { ...message, id },
          },
        },
      )
      .exec();
  }
}
