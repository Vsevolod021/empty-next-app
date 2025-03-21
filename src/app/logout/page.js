'use server';

import { redirect } from 'next/navigation';

async function Page() {
  return redirect('/auth');
}

export default Page;
