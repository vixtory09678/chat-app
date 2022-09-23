/* eslint-disable @next/next/no-img-element */

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { api } from '../../services/apiInstance';
import { AuthContext } from '../../src/contexts/AuthContext';

export function SignOutBox() {
  const { replace } = useRouter();
  const authContext = useContext(AuthContext);

  const signOut = async () => {
    api
      .authControllerLogout()
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Can not log out');
        }
        authContext.deleteCookie();
        replace('/login');
      })
      .catch((error) => {
        console.error('log out', error);
      });
  };

  return (
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

      <a
        className="m-5 text-sm font-bold hover:text-blue-500 hover:cursor-pointer"
        onClick={() => signOut()}
      >
        LogOut
      </a>
    </div>
  );
}
