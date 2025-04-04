'use server';

import { validateForm } from '@/actions/form';
import { apiEndpoint } from '@/config';
import { POST } from './api';

export async function createUser(data) {
  try {
    const errors = await validateForm(data);

    if (errors.length !== 0) {
      return errors;
    }

    await POST(`${apiEndpoint}/users`, data);

    return [];
  } catch (e) {
    return [{ field: 'form', message: e.data }];
  }
}
