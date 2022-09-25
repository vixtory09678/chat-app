import { deleteCookie, getCookie } from 'cookies-next';
import { isUndefined } from 'lodash';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { UserResponse } from '../api/data-contracts';
import { errorHandler } from '../api/error-handling';
import { userFetcher } from '../api/fetchers';

type AuthContextType = {
  getCookie: () => string | undefined;
  deleteCookie: () => void;
};

const defaultAuthContext = {
  getCookie: () => '',
  deleteCookie: () => {},
};

type UserContextType = {
  profile: UserResponse | undefined;
  updateProfile: () => void;
};

const defaultUserContext = {
  profile: {
    displayName: '',
    id: '',
    username: '',
    profileImageUrl: '',
    profileColor: '',
  },
  updateProfile: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
export const UserContext = createContext<UserContextType>(defaultUserContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function useUserContext() {
  return useContext(UserContext);
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authContext, setAuthContext] = useState<AuthContextType>(defaultAuthContext);
  const { replace } = useRouter();
  const { enqueueSnackbar: toastProvider } = useSnackbar();

  const { data: profile, mutate: updateProfile } = useSWR<UserResponse>('/profile', userFetcher, {
    onError: (error) => errorHandler(error, toastProvider),
  });

  useEffect(() => {
    setAuthContext({
      deleteCookie: () => deleteCookie('CHAT_APP_SESSION'),
      getCookie: () => getCookie('CHAT_APP_SESSION')?.toString(),
    });
  }, []);

  useEffect(() => {
    const cookie = authContext.getCookie();
    if (isUndefined(cookie)) {
      authContext.deleteCookie();
      replace('/login');
    }
  }, [authContext]);

  return (
    <>
      <AuthContext.Provider value={authContext}>
        <UserContext.Provider
          value={{
            profile: profile ?? defaultUserContext.profile,
            updateProfile,
          }}
        >
          {children}
        </UserContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
