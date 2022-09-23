import { deleteCookie, getCookie } from 'cookies-next';
import { isUndefined } from 'lodash';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  getCookie: () => string | undefined;
  deleteCookie: () => void;
};

const defaultAuthContext = {
  getCookie: () => '',
  deleteCookie: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authContext, setAuthContext] =
    useState<AuthContextType>(defaultAuthContext);
  const { replace } = useRouter();

  useEffect(() => {
    setAuthContext({
      deleteCookie: () => deleteCookie('CHAT_APP_SESSION'),
      getCookie: () => getCookie('CHAT_APP_SESSION')?.toString(),
    });
  }, []);

  useEffect(() => {
    const cookie = authContext.getCookie();
    if (isUndefined(cookie)) {
      replace('/login');
    }
  }, [authContext]);

  return (
    <>
      <AuthContext.Provider value={authContext}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
