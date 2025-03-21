'use server';

import { getProfileInfo } from '@/actions/auth';

import Button from './Button';

async function Page() {
  const profile = await getProfileInfo();

  return (
    <div>
      <h2>profile</h2>
      <p>
        <b>Имя: </b>
        <span>{profile.name}</span>
      </p>
      <p>
        <b>Фамилия: </b>
        <span>{profile.surname}</span>
      </p>
      <p>
        <b>Отчество: </b>
        <span>{profile.patronymic}</span>
      </p>
      <Button>Logout</Button>
    </div>
  );
}

export default Page;
