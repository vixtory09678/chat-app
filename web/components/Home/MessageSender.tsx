import { useState } from 'react';
import { isUndefined } from 'lodash';

export function MessageSender() {
  const [height, setHeight] = useState<number>(40);
  const [message, setMessage] = useState<string>('');

  return (
    <>
      <div className="flex h-fit bg-slate-100 p-4 items-center justify-between gap-4 border-t-2">
        <textarea
          rows={1}
          id="message"
          style={{ height: `${height}px` }}
          className={`rounded-[10px] flex-grow p-2 overflow-scroll`}
          onInput={(e) => {
            const getMessageLine = e.currentTarget?.value.split('\n').length;
            const getMessage = e.currentTarget?.value;
            if (isUndefined(getMessageLine)) return;

            setMessage(getMessage);
            setHeight((prev) => {
              if (getMessageLine > 6) return prev;
              return (prev = (getMessageLine - 1) * 24 + 40);
            });
          }}
          onKeyDown={(e) => console.log(e.code)}
          placeholder="Type message.."
        />
        <button
          type="button"
          className="h-10 rounded-full px-5 bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => console.log(message)}
        >
          Send
        </button>
      </div>
    </>
  );
}
