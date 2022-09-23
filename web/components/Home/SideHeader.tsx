export function SideHeader() {
  return (
    <div className="flex flex-between items-center w-full">
      <h1 className="m-5 text-2xl font-bold flex-grow">Friends</h1>
      <span className="w-7 h-7 rounded-full mr-5 bg-green-500 hover:bg-green-400 text-white text-center hover:cursor-pointer">
        +
      </span>
    </div>
  );
}
