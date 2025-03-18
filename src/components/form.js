'use client';

import { createAlbum } from '@/actions/actions';
import { useEffect, useState } from 'react';

const Form = () => {
  const [form, setForm] = useState({ title: '', author: '' });

  const onFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await createAlbum(form);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
      />
      <input
        type="text"
        name="author"
        placeholder="author"
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
      />
      <button type="submit">Click me</button>
    </form>
  );
};

export default Form;
