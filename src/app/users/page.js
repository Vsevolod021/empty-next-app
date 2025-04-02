'use server';

import UsersForm from './Form';

async function Page() {
  return (
    <div className="users-page">
      <h1>Пользователи</h1>

      <UsersForm />
    </div>
  );
}

export default Page;
