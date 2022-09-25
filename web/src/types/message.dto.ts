export interface MessageSender {
  from: string;
  to: string;
  type: 'text' | 'image';
  message: string;
}
export interface MessageSender {
  from: string;
  to: string;
  type: 'text' | 'image';
  message: string;
}

export enum ActionType {
  TYPING,
  IDLE,
}

export interface MessageReceiver {
  from: string;
  to: string;
  timestamp: string;
  type: 'text' | 'image' | 'action';
  message: string | ActionType;
}
