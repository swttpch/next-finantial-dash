import LoginForm from '@/components/Forms/Login';
import { Suspense } from 'react';

export default async function Login() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
