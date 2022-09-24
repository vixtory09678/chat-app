/* eslint-disable @next/next/no-img-element */
import { ReactElement, useContext } from 'react';
import { ChatHistoryItem } from '../components/Home/ChatHistoryItem';
import { MessageSender } from '../components/Home/MessageSender';
import { Message } from '../components/Home/Message';
import { SignOutBox } from '../components/Home/SignOutBox';
import { SideHeader } from '../components/Home/SideHeader';
import { AuthContextProvider, UserContext } from '../src/contexts/AuthContext';
import { UserProfile } from '../components/Home/UserProfile';

function HomePage({}) {
  const user = useContext(UserContext);

  return (
    <>
      <div className="h-screen w-screen bg-slate-100 flex">
        <div className="w-[310px] border-r-2">
          <div className="flex flex-col justify-between h-full">
            <SideHeader />

            <div className="h-full overflow-scroll">
              <div className="flex flex-col gap-2 w-fit py-2">
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
                <ChatHistoryItem />
              </div>
            </div>

            <SignOutBox />
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col gap-1 p-5 bg-slate-50 w-full flex-grow">
            <Message
              friendImageProfileUrl={'mock/team-profile.jpeg'}
              message={{ text: 'Hello!!', time: '12:32 10/12/22' }}
              side="left"
            />
            <Message
              friendImageProfileUrl={'mock/team-profile.jpeg'}
              message={{ text: 'Hi!!', time: '12:32 10/12/22' }}
              side="left"
            />
            <Message
              message={{
                text: 'Hello johnasdfasdfasfasdfasfasdfsadfsafsadfsafsadfsafsadfsafsdafsadfsadfsadf!!',
                time: '12:32 10/12/22',
              }}
              side="right"
            />
          </div>

          <MessageSender />
        </div>

        {/* Profile */}
        <UserProfile
          profile={user.profile!}
          updateProfile={user.updateProfile}
        />
      </div>
    </>
  );
}

HomePage.layout = (page: ReactElement) => {
  return <AuthContextProvider>{page}</AuthContextProvider>;
};

export default HomePage;
