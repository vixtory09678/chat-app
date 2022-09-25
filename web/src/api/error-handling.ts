import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import getConfig from 'next/config';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

const { publicRuntimeConfig } = getConfig();
const COOKIE_APP = publicRuntimeConfig.NEXT_PUBLIC_COOKIE_APP;

export function errorHandler(
  error: any,
  toastProvider?: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
) {
  let errorMessage = '';
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    errorMessage = error.response?.data?.message || 'Unknown error';

    if (status === 401 || status === 403) {
      deleteCookie(COOKIE_APP);
      window.location.href = '/login';
    }
  } else {
    errorMessage = error.message || 'Unknown error';
  }

  toastProvider
    ? toastMessage(errorMessage, { variant: 'error' }, toastProvider)
    : console.error('ErrorHandler:', errorMessage);
}

export function getSimpleErrorMessage(error: any): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message;
  }
  return error.message;
}

export function toastMessage(
  message: string,
  options: OptionsObject,
  handler: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
): SnackbarKey {
  return handler(message, {
    ...options,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    autoHideDuration: 3000,
  });
}
