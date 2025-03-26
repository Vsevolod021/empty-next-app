'use server';

import { GET } from './api';
import { apiEndpoint } from '@/config';

export async function getGroupsList(name = '', sortDirection = 'desc', sort = 'name') {
  const url = `${apiEndpoint}/groups?sort=${sort}&sortDirection=${sortDirection}&name=${name}`;

  return await GET(url);
}
