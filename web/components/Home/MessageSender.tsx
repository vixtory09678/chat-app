import { useCallback, useEffect, useMemo, useState } from 'react';
import { isUndefined } from 'lodash';

export function MessageSender() {
  const [height, setHeight] = useState<number>(40);

  const setHeightMessage = () => {
    return 'h-[' + height.toString() + 'px]';
  };

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
            if (isUndefined(getMessageLine)) return;
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
        >
          Send
        </button>
      </div>
    </>
  );
}
