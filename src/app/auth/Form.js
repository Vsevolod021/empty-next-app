'use client';

import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { logIn } from '@/actions/auth';
import { useState } from 'react';

import Input from '@/components/Input';

const Form = observer(() => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const formError = errors.find((error) => error.field === 'form')?.message;

  const inputError = (field) => errors.find((error) => error.field === field);

  const onFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors([]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const errors = await logIn(form);

    setErrors(errors);

    if (errors.length === 0) {
      router.push('/profile');
    }
  };

  return (
    <form onSubmit={onSubmit} className="auth-page__form">
      <Input
        type="text"
        name="username"
        placeholder="Логин"
        value={form.username}
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        error={inputError('username')}
      />
      <Input
        type="password"
        name="password"
        placeholder="Пароль"
        value={form.password}
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        error={inputError('password')}
      />
      <div className="auth-page__form-error">{formError ?? ''}</div>
      <button type="submit">Войти</button>
    </form>
  );
});

export default Form;
