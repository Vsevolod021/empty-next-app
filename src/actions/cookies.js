'use server';

import { cookiesOptions } from '@/store/authStore';
import { cookies } from 'next/headers';

export async function setCookies(name, value, options = cookiesOptions) {
  const cookiesStorage = await cookies();

  return cookiesStorage.set({ name, value: JSON.stringify(value), ...options });
}

export async function getCookies() {
  const cookiesStorage = await cookies();

  try {
    return await JSON.parse(cookiesStorage.get('tokens')?.value);
  } catch {
    return null;
  }
}

export async function deleteCookies() {
  const cookiesStorage = await cookies();

  return cookiesStorage.delete('tokens');
}
