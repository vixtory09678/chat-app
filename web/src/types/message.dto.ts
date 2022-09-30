import { Message } from '../api/data-contracts';
export class MessageBuilder {
  private message: Partial<Message> = {};

  from(userId: string) {
    this.message.from = userId;
    return this;
  }

  to(userId: string) {
    this.message.to = userId;
    return this;
  }

  msg(msg: string) {
    this.message.text = msg;
    return this;
  }

  build(): string {
    return JSON.stringify({
      ...this.message,
    });
  }
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function getMessageReceiver(msg: string): Message | undefined {
  return isJsonString(msg) ? (JSON.parse(msg) as Message) : undefined;
}
