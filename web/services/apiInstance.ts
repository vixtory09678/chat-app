import getConfig from 'next/config';
import { Api } from '../src/api/Api';
import { deleteCookie } from 'cookies-next';

const { publicRuntimeConfig } = getConfig();

const BACKEND_URL = publicRuntimeConfig.NEXT_PUBLIC_BACKEND_URL;
const APP_URL = publicRuntimeConfig.NEXT_PUBLIC_APP_URL;
const COOKIE_APP = publicRuntimeConfig.NEXT_PUBLIC_COOKIE_APP;

export const api = new Api({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

api.instance.interceptors.response.use((response) => {
  const status = response.status;
  if (status === 401 || status === 403) {
    deleteCookie(COOKIE_APP);
    window.location.replace(APP_URL + '/login');
  }
  return response;
});
