import { AxiosError } from 'axios';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

export function getSimpleErrorMessage(error: any): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message;
  }
  return error.message;
}

export function toastMessage(
  message: string,
  options: OptionsObject,
  handler: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined,
  ) => SnackbarKey,
): SnackbarKey {
  return handler(message, {
    ...options,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    autoHideDuration: 3000,
  });
}
