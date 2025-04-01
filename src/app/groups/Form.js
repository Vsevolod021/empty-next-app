'use client';

import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const Form = observer(({ name, sort }) => {
  const [form, setForm] = useState({ name: name, sort: sort });
  const router = useRouter();

  const loadData = (event) => {
    event.preventDefault();

    router.push(`/groups?sort=${form.sort}&name=${form.name}`);
  };

  const onNameChange = (value) => {
    setForm({ ...form, name: value });
  };

  const onSortChange = () => {
    const sort = form.sort === 'desc' ? 'asc' : 'desc';

    setForm({ ...form, sort });
  };

  return (
    <div className="groups-form">
      <form onSubmit={loadData}>
        <input
          type="text"
          name="name"
          placeholder="Введите Группу"
          onChange={(e) => onNameChange(e.target.value)}
          value={form.name}
        />
        <button type="button" onClick={onSortChange}>
          {form.sort === 'desc' ? 'desc' : 'asc'}
        </button>
        <button type="submit">Применить изменения</button>
      </form>
    </div>
  );
});

export default Form;
