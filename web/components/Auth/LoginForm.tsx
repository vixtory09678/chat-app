import Link from 'next/link';
import { Button } from '../Buttons/Button';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import { api } from '../../services/apiInstance';
import { useSnackbar } from 'notistack';
import {
  getSimpleErrorMessage,
  toastMessage,
} from '../../src/api/error-handling';

type LoginSubmitType = {
  username: string;
  password: string;
};

export function LoginForm({}) {
  const { replace } = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    const { username, password } = data as LoginSubmitType;

    api
      .authControllerLogin({ username, password })
      .then((res) => {
        if (res?.status !== 200) {
          console.error('Login failed');
        }
        toastMessage('Success', { variant: 'success' }, enqueueSnackbar);
        replace('/');
      })
      .catch((error) => {
        console.error(error);
        const errMessage = getSimpleErrorMessage(error);
        toastMessage(errMessage, { variant: 'error' }, enqueueSnackbar);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-auto w-[320px] bg-white p-5 rounded-md shadow-md"
      >
        <div className="grid gap-y-2">
          <p className="text-2xl text-gray-500 mb-2">Chat App</p>
          <input
            type="text"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
            id="username"
            placeholder="Username"
            className="w-full h-10 rounded-md p-2 bg-gray-100"
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <p className="text-red-500 text-xs font-light">* {message}</p>
            )}
          />

          <input
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
            })}
            id="password"
            placeholder="Password"
            className="w-full h-10 rounded-md p-2 bg-gray-100"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className="text-red-500 text-xs font-light">* {message}</p>
            )}
          />

          <Link href={'/register'}>
            <a className="text-gray-500 text-sm w-fit hover:text-blue-400">
              Register
            </a>
          </Link>
          <Button label="Login" submit />
        </div>
      </form>
    </>
  );
}
