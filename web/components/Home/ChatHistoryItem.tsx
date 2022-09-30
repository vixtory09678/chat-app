/* eslint-disable @next/next/no-img-element */

import { RoomResponse } from '../../src/api/data-contracts';
import { dateToSimpleTime } from '../../src/utils/format';
import { AvatarColor } from './AvatarColor';

interface ChatHistoryItemProps {
  room: RoomResponse;
  onCLick?: () => void;
}

export function ChatHistoryItem({ onCLick, room }: ChatHistoryItemProps) {
  return (
    <div
      className="flex items-center justify-between gap-1 hover:bg-slate-200 cursor-pointer px-2"
      onClick={onCLick}
    >
      <>
        {room.roomProfileImageUrl ? (
          <img
            src={'mock/team-profile.jpeg'}
            alt="test"
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <AvatarColor
            profile={{
              displayName: room.roomName,
              profileColor: room.roomProfileColor ?? '',
              profileImageUrl: room.roomProfileImageUrl,
              username: '',
              id: '',
            }}
            type="medium"
          />
        )}
      </>
      <div className="flex flex-col gap-1 p-1">
        <p className="font-bold w-44 text-ellipsis overflow-hidden whitespace-nowrap">
          {room.roomName}
        </p>
        <p className="text-slate-400 text-xs w-40 text-ellipsis overflow-hidden whitespace-nowrap">
          {room.lastMessage}
        </p>
      </div>
      <div className="flex text-center">
        <p className="font-light text-xs">{dateToSimpleTime(room.updatedAt)}</p>
      </div>
    </div>
  );
}
