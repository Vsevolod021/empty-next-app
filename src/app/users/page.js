'use server';

import Form from './Form';

async function Page() {
  return (
    <div className="users-page">
      <h1>Пользователи</h1>

      <Form />
    </div>
  );
}

export default Page;
