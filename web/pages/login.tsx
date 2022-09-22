import { ReactElement } from 'react';
import { LoginForm } from '../components/Auth/LoginForm';
import { AuthenticationLayout } from '../layouts/AuthenticationLayout';

function LoginPage() {
  return <LoginForm />;
}

LoginPage.layout = function (page: ReactElement) {
  return <AuthenticationLayout>{page}</AuthenticationLayout>;
};

export default LoginPage;
