import { UserResponse } from '../../src/api/data-contracts';
import { dateToSimpleTime, toSimpleTime } from '../../src/utils/format';
import { AvatarColor } from './AvatarColor';

/* eslint-disable @next/next/no-img-element */
type MessageType = {
  text: string;
  time: number | string;
};

type ShortProfile = {
  imgUrl: string;
  name: string;
};

interface MessageProps {
  profile?: UserResponse;
  message: MessageType;
  side: 'left' | 'right';
  spaceBetweenMessage?: boolean;
  isSameDay?: boolean;
  isSameMinute?: boolean;
}

export function MessageItem({
  profile,
  message,
  side,
  spaceBetweenMessage = false,
  isSameMinute = false,
}: MessageProps) {
  const messageSideColor = () => {
    if (side === 'left') {
      return 'bg-gray-200 text-gray-600 message-left';
    }
    return 'bg-blue-400 text-white message-right';
  };

  return (
    <>
      <div
        className={`flex ${side === 'left' ? 'justify-start' : 'justify-end'} items-center gap-3 ${
          spaceBetweenMessage ? 'mt-5' : ''
        } ${!isSameMinute ? 'mt-3' : ''}`}
      >
        {side === 'left' && (
          <>
            {profile?.profileImageUrl ? (
              <img
                src={'mock/team-profile.jpeg'}
                width={30}
                height={30}
                alt={'wannachat surasiang'}
                className="rounded-full"
              />
            ) : (
              <AvatarColor profile={profile!} type={'small'} />
            )}
          </>
        )}
        {!isSameMinute && (
          <span className={`font-light text-xs ${side === 'left' ? 'order-1' : 'order-0'}`}>
            {toSimpleTime(message.time)}
          </span>
        )}
        <span className={`max-w-[320px] ${messageSideColor()} break-all`}>{message.text}</span>
      </div>
    </>
  );
}
