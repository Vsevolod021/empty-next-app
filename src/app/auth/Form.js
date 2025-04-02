'use client';

import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { logIn } from '@/actions/auth';

import Form from '@/components/Form';

const formTemplate = { username: '', password: '' };

const AuthForm = observer(() => {
  const router = useRouter();

  const onSubmitSuccess = () => router.push('/profile');

  return (
    <Form
      className="auth-page__form"
      onSubmitSuccess={onSubmitSuccess}
      formTemplate={formTemplate}
      action={logIn}
    >
      <Form.Input placeholder="Логин" name="username" />
      <Form.Input placeholder="Пароль" name="password" type="password" />

      <Form.Submit>Войти</Form.Submit>
    </Form>
  );
});

export default AuthForm;
