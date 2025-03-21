'use client';

import { observer } from 'mobx-react-lite';
import { logIn } from '@/actions/auth';
import { useState } from 'react';

const Page = observer(() => {
  const [form, setForm] = useState({ username: '', password: '' });

  const onFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <form action={logIn}>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        value={form.username}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        value={form.password}
      />
      <button type="submit">Log in</button>
    </form>
  );
});

export default Page;
