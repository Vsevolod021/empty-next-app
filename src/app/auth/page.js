'use client';

import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { logIn } from '@/api/api';
import { useState } from 'react';

const Form = observer(() => {
  const router = useRouter();

  const [form, setForm] = useState({ username: '', password: '' });

  const onFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    await logIn({ ...form });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="username"
        name="username"
        placeholder="username"
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        value={form.username}
      />
      <input
        type="text"
        name="password"
        placeholder="password"
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        value={form.password}
      />
      <button type="submit">Log in</button>
    </form>
  );
});

export default Form;
