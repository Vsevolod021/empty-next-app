'use server';

import { getProfileInfo } from '@/actions/auth';
import Button from './Button';

async function Page() {
  const profile = await getProfileInfo();

  return (
    <div className="profile-page">
      <h1>profile</h1>
      <h3>
        <b>Имя: </b>
        <span>{profile.name}</span>
      </h3>
      <h3>
        <b>Фамилия: </b>
        <span>{profile.surname}</span>
      </h3>
      <h3>
        <b>Отчество: </b>
        <span>{profile.patronymic}</span>
      </h3>
      <Button>Logout</Button>
    </div>
  );
}

export default Page;
