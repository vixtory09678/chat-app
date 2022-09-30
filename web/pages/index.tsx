/* eslint-disable @next/next/no-img-element */
import { ReactElement, useContext, useEffect, useState } from 'react';
import { ChatHistoryItem } from '../components/Home/ChatHistoryItem';
import { SignOutBox } from '../components/Home/SignOutBox';
import { SideHeader } from '../components/Home/SideHeader';
import { AuthContextProvider, UserContext } from '../src/contexts/AuthContext';
import { UserProfile } from '../components/Home/UserProfile';
import { RoomResponse } from '../src/api/data-contracts';
import useSWR from 'swr';
import { errorHandler } from '../src/api/error-handling';
import { useSnackbar } from 'notistack';
import { roomsFetcher } from '../src/api/fetchers';
import { ChatBox } from '../components/Home/ChatBox';

function HomePage({}) {
  const user = useContext(UserContext);
  const [currentRoom, setCurrentRoom] = useState<RoomResponse>();
  const { enqueueSnackbar: toastProvider } = useSnackbar();
  const { data: rooms, mutate: updateRooms } = useSWR<RoomResponse[]>('/api/rooms', roomsFetcher, {
    onError: (err) => errorHandler(err, toastProvider),
  });

  const onCreateNewRoom = async (room: RoomResponse) => {
    setCurrentRoom(room);
    await updateRooms();
  };

  useEffect(() => {
    setCurrentRoom(rooms?.length ? rooms[0] : undefined);
  }, [rooms]);

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="w-[310px] border-r-2">
          <div className="flex flex-col justify-between h-full">
            <SideHeader onCreateNewRoom={onCreateNewRoom} />

            <div className="h-full overflow-scroll">
              <div className="flex flex-col gap-2 w-fit py-2">
                {rooms?.map((room) => (
                  <ChatHistoryItem
                    room={room}
                    key={room.roomId}
                    onCLick={() => setCurrentRoom(room)}
                  />
                ))}
              </div>
            </div>

            <SignOutBox />
          </div>
        </div>

        {/* Chat Box */}
        <ChatBox currentRoom={currentRoom} updateRooms={updateRooms} />

        {/* Profile */}
        <UserProfile profile={user.profile!} updateProfile={user.updateProfile} />
      </div>
    </>
  );
}

HomePage.layout = (page: ReactElement) => {
  return <AuthContextProvider>{page}</AuthContextProvider>;
};

export default HomePage;
