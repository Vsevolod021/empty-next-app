'use server';

import { getGroupsList } from '@/api/groups';

import GroupsList from './GroupsList';
import Form from './Form';

export async function Page({ searchParams }) {
  const { name = '', sort = 'desc' } = await searchParams;

  const groupsList = await getGroupsList(name, sort);

  return (
    <div className="groups-page">
      <h1>Группы</h1>

      <Form name={name} sort={sort} />

      <GroupsList groupsList={groupsList} />
    </div>
  );
}

export default Page;
