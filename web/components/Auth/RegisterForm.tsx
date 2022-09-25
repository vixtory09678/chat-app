import { Button } from '../Buttons/Button';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { api } from '../../services/apiInstance';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { errorHandler, toastMessage } from '../../src/api/error-handling';
import { useSnackbar } from 'notistack';

type RegisterSubmitType = {
  username: string;
  password: string;
};

export function RegisterForm() {
  const { replace } = useRouter();
  const password = useRef({});
  const { enqueueSnackbar: toastProvider } = useSnackbar();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  password.current = watch('password', '');

  const onSubmit = async (data: any) => {
    const { username, password } = data as RegisterSubmitType;
    api
      .authControllerRegister({ username, password })
      .then((response) => {
        if (response.status === 201) {
          replace('/login');
        } else {
          toastMessage('Something went wrong', { variant: 'warning' }, toastProvider);
        }
      })
      .catch((err) => {
        console.error(err);
        errorHandler(err, toastProvider);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-auto w-[320px] bg-white p-5 rounded-md">
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
          render={({ message }) => <p className="text-red-500 text-xs font-light">* {message}</p>}
        />

        <input
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters',
            },
          })}
          id="password"
          placeholder="Password"
          className="w-full h-10 rounded-md p-2 bg-gray-100"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className="text-red-500 text-xs font-light">* {message}</p>}
        />

        <input
          type="password"
          {...register('againPassword', {
            required: {
              value: true,
              message: 'Password is required',
            },
            validate: (value) => value === password.current || 'The password is not match',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters',
            },
          })}
          id="againPassword"
          placeholder="Repeat password"
          className="w-full h-10 rounded-md p-2 bg-gray-100"
        />
        <ErrorMessage
          errors={errors}
          name="againPassword"
          render={({ message }) => <p className="text-red-500 text-xs font-light">* {message}</p>}
        />

        <Button label="Register" submit={true} className="mt-4" />
      </div>
    </form>
  );
}
