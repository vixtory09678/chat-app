/* eslint-disable @next/next/no-img-element */
export function ChatHistoryItem() {
  return (
    <div className="flex items-center justify-between gap-1 hover:bg-slate-200 cursor-pointer px-2">
      <img
        src={'mock/team-profile.jpeg'}
        alt="test"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex flex-col gap-1 p-1">
        <p className="font-bold w-44 text-ellipsis overflow-hidden whitespace-nowrap">
          Wannachat Surasiang
        </p>
        <p className="font-light text-xs w-40 text-ellipsis overflow-hidden whitespace-nowrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, nihil.
          Ad, atque alias? Pariatur facilis accusamus ea architecto quis iste
          reprehenderit quaerat excepturi recusandae sit, id natus dicta quasi
          eligendi?
        </p>
      </div>
      <div className="flex text-center">
        <p className="font-light text-xs">13:20 10/12/22</p>
      </div>
    </div>
  );
}
