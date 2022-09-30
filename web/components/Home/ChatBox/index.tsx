import dayjs from 'dayjs';
import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { api } from '../../../services/apiInstance';
import { Message, RoomResponse } from '../../../src/api/data-contracts';
import { errorHandler } from '../../../src/api/error-handling';
import { useUserContext } from '../../../src/contexts/AuthContext';
import { getMessageReceiver, MessageBuilder } from '../../../src/types/message.dto';
import { isSameDay, isSameMinute } from '../../../src/utils/format';
import { MessageItem } from '../Message';
import { MessageSender } from '../MessageSender';

interface ChatBoxProps {
  currentRoom?: RoomResponse;
  updateRooms?: () => void;
}

export function ChatBox({ currentRoom, updateRooms }: ChatBoxProps) {
  const { client } = useMqttState();
  const { profile } = useUserContext();
  const { message } = useSubscription([`/rooms/${currentRoom?.roomId}/chat`]);
  const { message: chatEvent } = useSubscription([`/rooms/${currentRoom?.roomId}/chat/event`]);
  const { enqueueSnackbar: toastProvider } = useSnackbar();
  const [receivedMessage, setReceiveMessage] = useState<Message[]>([]);
  const [chatEventMessage, setChatEventMessage] = useState<Message[]>([]);

  const getProfile = (userId: string) => {
    return currentRoom?.participants.find((user) => user.id === userId);
  };

  useEffect(() => {
    if (currentRoom?.roomId) {
      setReceiveMessage([]);

      api
        .roomControllerGetChatRoom(currentRoom.roomId)
        .then((response) => response.data)
        .then((chatRoomResponse) => {
          setReceiveMessage((prev) => [...prev, ...(chatRoomResponse?.messages ?? [])]);
        });
    }
    return () => {
      setReceiveMessage([]);
    };
  }, [currentRoom?.roomId]);

  useEffect(() => {
    if (!message?.message) return;
    const receivedMessage = getMessageReceiver(message.message as string);

    if (!receivedMessage) return;

    setReceiveMessage((prev) => [...prev, receivedMessage]);
    updateRooms ? updateRooms() : null;
  }, [message?.message]);

  useEffect(() => {
    if (!chatEvent?.message) return;
    const receivedMessage = getMessageReceiver(chatEvent?.message as string);

    if (!receivedMessage) return;

    if (receivedMessage.text === 'IDLE') {
      setChatEventMessage((prev) =>
        prev.filter((message) => message.from !== receivedMessage.from),
      );
      return;
    }
    setChatEventMessage((prev) => [...prev, receivedMessage]);
  }, [chatEvent?.message]);

  const onSendMessage = (text: string) => {
    if (!profile || !currentRoom) return;
    const message = new MessageBuilder()
      .from(profile?.id)
      .to(currentRoom?.roomId)
      .msg(text)
      .build();
    client?.publish('/rooms/chat', message, async (error) => {
      if (error) {
        errorHandler('MQTT Error ' + error, toastProvider);
        updateRooms ? await updateRooms() : null;
      }
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="px-5 py-3 border-b-2">
        <p className="text-md">{`${currentRoom?.roomName ?? 'No room selected'}`}</p>
      </div>
      <div className="flex flex-col gap-1 p-5 w-full flex-grow overflow-scroll">
        {receivedMessage.map((msg, index, array) => (
          <div key={msg.id}>
            {!isSameDay(msg.createdAt, array[index - 1]?.createdAt ?? null) && (
              <div className="w-full py-2 text-center text-slate-500 font-light text-xs">
                {dayjs(msg.createdAt as string).format('DD-MM-YYYY')}
              </div>
            )}
            <MessageItem
              profile={getProfile(msg.from)}
              message={{ text: msg.text as string, time: msg.createdAt }}
              side={msg.from === profile?.id ? 'right' : 'left'}
              spaceBetweenMessage={array[index - 1]?.from !== msg?.from}
              isSameMinute={isSameMinute(msg.createdAt, array[index - 1]?.createdAt ?? null)}
            />
          </div>
        ))}
        {chatEventMessage?.map((msg) => (
          <>
            {msg?.from !== profile?.id && (
              <MessageItem
                profile={getProfile(msg.from)}
                message={{ text: 'Typing..', time: msg.createdAt }}
                side={msg.from === profile?.id ? 'right' : 'left'}
              />
            )}
          </>
        ))}
      </div>

      <MessageSender onSendMessage={onSendMessage} roomId={currentRoom?.roomId} />
    </div>
  );
}
