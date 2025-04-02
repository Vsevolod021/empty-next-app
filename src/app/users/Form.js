'use client';

import { observer } from 'mobx-react-lite';
import { createUser } from '@/api/users';
import { useState } from 'react';

import Input from '@/components/Input';

const formTemplate = {
  username: '',
  password: '',
  passwordRepeat: '',
  name: '',
  surname: '',
  patronymic: ''
};

const Form = observer(() => {
  const [form, setForm] = useState(formTemplate);
  const [errors, setErrors] = useState([]);

  const formError = errors.find((error) => error.field === 'form')?.message;

  const inputError = (field) => errors.find((error) => error.field === field);

  const onFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors([]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const errors = await createUser(form);
    setErrors(errors);

    if (errors.length === 0) {
      alert('Пользователь успешно создан');
      setForm(formTemplate);
    }
  };

  return (
    <form onSubmit={onSubmit} className="users-page__form">
      <Input
        type="text"
        name="surname"
        placeholder="Фамилия"
        value={form.surname}
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        error={inputError('surname')}
      />
      <Input
        name="name"
        placeholder="Имя"
        value={form.name}
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        error={inputError('name')}
      />
      <Input
        name="patronymic"
        placeholder="Отчество"
        value={form.patronymic}
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        error={inputError('patronymic')}
      />
      <Input
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
      <Input
        type="password"
        name="passwordRepeat"
        placeholder="Повторите пароль"
        value={form.passwordRepeat}
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        error={inputError('passwordRepeat')}
      />
      <div className="auth-page__form-error">{formError ?? ''}</div>
      <button type="submit">Создать пользователя</button>
    </form>
  );
});

export default Form;
