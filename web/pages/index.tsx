/* eslint-disable @next/next/no-img-element */
import { ReactElement } from 'react';
import { ChatHistoryItem } from '../components/Home/ChatHistoryItem';
import { MessageSender } from '../components/Home/MessageSender';
import { Message } from '../components/Home/Message';

function HomePage({}) {
  return (
    <>
      <div className="h-screen w-screen bg-slate-100 flex">
        <div className="w-[310px] border-r-2">
          <div className="flex flex-col justify-between h-full">
            <h1 className="m-5 text-2xl font-bold">Friends</h1>
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

            <div className="flex items-center p-1 gap-2 justify-between shadow-[0_-6px_16px_-6px_rgba(74,74,74,0.2)]">
              <div className="flex items-center gap-3 flex-grow hover:cursor-pointer">
                <img
                  src={'mock/team-profile.jpeg'}
                  height={45}
                  width={45}
                  alt=""
                  className="rounded-full"
                />
                <p className="w-48 text-ellipsis overflow-hidden whitespace-nowrap">
                  Wannachat Surasiang
                </p>
              </div>

              <a className="m-5 text-sm font-bold hover:text-blue-500 hover:cursor-pointer">
                Logout
              </a>
            </div>
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

        {/* Friend Profile */}
        <div className="flex flex-col w-[310px] border-l-2 items-center gap-4">
          <img
            src={'mock/team-profile.jpeg'}
            height={200}
            width={200}
            alt=""
            className="rounded-full pt-5"
          />
          <p className="font-light text-xl text-center">
            Wannachat Surasiang
            <br />
            Team
          </p>
        </div>
      </div>
    </>
  );
}

HomePage.layout = (page: ReactElement) => {
  return <>{page}</>;
};

export default HomePage;
