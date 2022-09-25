import { Injectable } from '@nestjs/common';
import { Params, Payload, Subscribe } from 'nest-mqtt';

@Injectable()
export class WorkerService {
  @Subscribe('/rooms/+/chat')
  messageHandler(@Payload() payload, @Params() params) {
    const [roomId] = params;
    console.log(payload, roomId);
  }
}
