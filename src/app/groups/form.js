'use client';

import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const Form = observer(({ name, sort }) => {
  const [form, setForm] = useState({ name: name, sort: sort });
  const router = useRouter();

  const loadData = () => {
    router.push(`/groups?sort=${form.sort}&name=${form.name}`);
  };

  const onNameChange = (value) => {
    setForm({ ...form, name: value });
    loadData();
  };

  const onSortChange = () => {
    const sort = form.sort === 'desc' ? 'asc' : 'desc';

    setForm({ ...form, sort });
    loadData();
  };

  return (
    <div className="groups-form">
      <form>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => onNameChange(e.target.value)}
          value={form.name}
        />
        <button type="button" onClick={onSortChange}>
          {form.sort === 'desc' ? 'desc' : 'asc'}
        </button>
      </form>
    </div>
  );
});

export default Form;
