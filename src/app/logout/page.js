'use server';

import { redirect } from 'next/navigation';

async function Page() {
  redirect('/auth');

  return <div>logout</div>;
}

export default Page;
