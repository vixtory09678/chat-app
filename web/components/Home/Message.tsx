/* eslint-disable @next/next/no-img-element */
type MessageType = {
  text: string;
  time: string;
};

type ShortProfile = {
  imgUrl: string;
  name: string;
};

interface MessageProps {
  friendImageProfileUrl?: string;
  message: MessageType;
  side: 'left' | 'right';
}

export function Message({
  friendImageProfileUrl,
  message,
  side,
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
        className={`flex ${
          side === 'left' ? 'justify-start' : 'justify-end'
        } items-center gap-2`}
      >
        {side === 'left' && (
          <>
            <img
              src={friendImageProfileUrl}
              width={30}
              height={30}
              alt={'wannachat surasiang'}
              className="rounded-full"
            />
          </>
        )}
        <span
          className={`font-thin text-xs ${
            side === 'left' ? 'order-1' : 'order-0'
          }`}
        >
          {message.time}
        </span>
        <span className={`max-w-[320px] ${messageSideColor()} break-all`}>
          {message.text}
        </span>
      </div>
    </>
  );
}
