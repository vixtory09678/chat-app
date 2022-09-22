import { ReactElement } from 'react';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { AuthenticationLayout } from '../layouts/AuthenticationLayout';

function RegisterPage() {
  return <RegisterForm />;
}

RegisterPage.layout = function (page: ReactElement) {
  return <AuthenticationLayout>{page}</AuthenticationLayout>;
};

export default RegisterPage;
