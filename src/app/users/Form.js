'use client';

import { observer } from 'mobx-react-lite';
import { createUser } from '@/api/users';

import Form from '@/components/Form';

const formTemplate = {
  username: '',
  password: '',
  passwordRepeat: '',
  name: '',
  surname: '',
  patronymic: ''
};

const UsersForm = observer(() => {
  const onSubmitSuccess = () => alert('Пользователь успешно создан');

  return (
    <Form
      className="users-page__form"
      onSubmitSuccess={onSubmitSuccess}
      formTemplate={formTemplate}
      action={createUser}
    >
      <Form.Input placeholder="Фамилия" name="surname" />
      <Form.Input placeholder="Имя" name="name" />
      <Form.Input placeholder="Отчество" name="patronymic" />
      <Form.Input placeholder="Логин" name="username" />
      <Form.Input placeholder="Пароль" name="password" type="password" />
      <Form.Input placeholder="Повтор пароля" name="passwordRepeat" type="password" />

      <Form.Submit>Создать пользователя</Form.Submit>
    </Form>
  );
});

export default UsersForm;
