'use server';

import { createUrlWithQueryParams, GET, POST } from '@/api/api';
import { setCookies, deleteCookies } from '@/actions/cookies';
import { cookiesOptions } from '@/store/authStore';
import { redirect } from 'next/navigation';
import authStore from '@/store/authStore';

export async function setAuthorization(tokens) {
  authStore.setLastRefreshDate(new Date());

  if (tokens) {
    await setCookies('tokens', tokens, cookiesOptions);
    return;
  }

  await deleteCookies();
}

export async function checkAccessToken() {
  try {
    return await authStore.checkAccessToken();
  } catch (err) {
    return await logOut();
  }
}

export async function getProfileInfo() {
  const url = await createUrlWithQueryParams('/profile/');
  const userInfo = await GET(url);

  return await userInfo;
}

export async function logIn(data) {
  const url = await createUrlWithQueryParams('/auth/');
  const result = await POST(url, data);

  await setAuthorization(result);

  return redirect('/profile');
}

export async function logOut() {
  await setAuthorization(null);

  return redirect('/logout');
}
