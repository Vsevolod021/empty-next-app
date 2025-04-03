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
    <form className="groups-form" onSubmit={loadData}>
      <input
        onChange={(e) => onNameChange(e.target.value)}
        value={form.name}
        className="groups-form__input"
        placeholder="Введите Группу"
        type="text"
        name="name"
      />
      <button type="button" onClick={onSortChange} className="groups-form__sort">
        {form.sort === 'desc' ? 'А-я' : 'Я-а'}
      </button>
      <button type="submit" className="groups-form__submit">
        Применить
      </button>
    </form>
  );
});

export default Form;
