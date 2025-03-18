import { getCookies } from '@/api/api';
import Form from '@/components/form';
import { cookies } from 'next/headers';

async function Page({ ...props }) {
  // const cookiesStorage = await cookies();

  return <div>albums</div>;
}

export default Page;

export const revalidate = 3600;
