'use server';

import { getProfileInfo, logOut } from '@/actions/auth';

async function Page() {
  const profile = await getProfileInfo();

  return (
    <div className="profile-page">
      <h1>Профиль</h1>
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
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Page;
