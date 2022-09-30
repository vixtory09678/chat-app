import { useEffect, useRef, useState } from 'react';
import { isUndefined } from 'lodash';
import { useMqttState } from 'mqtt-react-hooks';
import { MessageBuilder } from '../../src/types/message.dto';
import { useUserContext } from '../../src/contexts/AuthContext';

interface MessageSenderProp {
  onSendMessage: (text: string) => void;
  roomId?: string;
}

enum KeyActionEvent {
  SEND = 'SEND',
  IDLE = 'IDLE',
  TYPING = 'TYPING',
}

const COOL_DOWN_INTERVAL = 1000;

export function MessageSender({ onSendMessage, roomId }: MessageSenderProp) {
  const [height, setHeight] = useState<number>(40);
  const [message, setMessage] = useState<string>('');
  const [keyEvent, setKeyEvent] = useState<KeyActionEvent>(KeyActionEvent.IDLE);
  const { profile } = useUserContext();
  const { client } = useMqttState();
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  const sendMessage = () => {
    setKeyEvent(KeyActionEvent.SEND);
    setCount(0);
    onSendMessage(message);
    setMessage('');
    setHeight(40);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev ? prev - 1 : 0));
    }, COOL_DOWN_INTERVAL);

    if (count === 0) {
      clearInterval(interval);
      setKeyEvent(KeyActionEvent.IDLE);
    }
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    const buildedMessage = new MessageBuilder()
      .from(profile?.id ?? '')
      .to(roomId ?? '')
      .msg(keyEvent === KeyActionEvent.SEND ? KeyActionEvent.IDLE : keyEvent)
      .build();
    client?.publish('/rooms/chat/event', buildedMessage);
  }, [keyEvent]);

  return (
    <>
      <div className="flex h-fit py-3 px-4 items-center justify-between gap-4 shadow-[0_-6px_16px_-6px_rgba(74,74,74,0.2)]">
        <textarea
          rows={1}
          id="message"
          name="message"
          ref={ref}
          value={message}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          style={{ height: `${height}px` }}
          className={`rounded-[10px] flex-grow p-2 overflow-scroll bg-slate-100`}
          onInput={(e) => {
            setCount(3);
            setKeyEvent(KeyActionEvent.TYPING);
            const getMessageLine = e.currentTarget?.value.split('\n').length;
            const getMessage = e.currentTarget?.value;
            if (isUndefined(getMessageLine)) return;

            setMessage(getMessage);
            setHeight((prev) => {
              if (getMessageLine > 6) return prev;
              return (prev = (getMessageLine - 1) * 24 + 40);
            });
          }}
          placeholder="Type message.."
        />
        <button
          type="button"
          className="h-10 rounded-full px-5 bg-blue-400 hover:bg-blue-500 text-white"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
}
