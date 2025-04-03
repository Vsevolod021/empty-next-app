'use server';

import { setCookies, deleteCookies, getTokensFromCookies } from '@/actions/cookies';
import authStore, { jsonHeaders, cookiesOptions } from '@/store/auth';
import { createUrlWithQueryParams, GET, POST } from '@/api/api';
import { redirect } from 'next/navigation';
import { validateForm } from './form';

// token

export async function setAuthorization(tokens) {
  authStore.setLastRefreshDate(new Date());

  if (tokens) {
    await setCookies('tokens', tokens, cookiesOptions);
    return;
  }

  const tokenData = await getTokensFromCookies();

  if (!tokenData) return;

  await deleteCookies();
}

export async function refreshAccessToken() {
  const error = new Error('Ошибка при обновлении токена авторизации');

  const tokens = await getTokensFromCookies();

  if (!tokens) throw error;

  const headers = new Headers(jsonHeaders);
  const body = JSON.stringify({ refresh: tokens.refresh });
  const request = { body, headers, method: 'POST', redirect: 'follow' };
  const url = await createUrlWithQueryParams('/auth/refresh_token/');

  const response = await fetch(url, request);

  if (!response.ok) throw error;

  const result = await response.json();

  if (!result.access) throw error;

  await setAuthorization({ access: result.access, refresh: tokens.refresh });
}

export async function sessionExpired(doRedirect = false) {
  if (doRedirect) {
    redirect('/auth');
  }

  throw new Error('Время сессии истекло');
}

async function checkAccessToken() {
  const tokens = await getTokensFromCookies();

  if (!tokens) {
    throw new Error('Ошибка при обновлении токена авторизации');
  }

  return await refreshAccessToken();
}

// profile

export async function checkAuthorized() {
  try {
    await checkAccessToken();
    return true;
  } catch (err) {
    return null;
  }
}

export async function getProfileInfo() {
  const url = await createUrlWithQueryParams('/profile/');
  const userInfo = await GET(url);

  return await userInfo;
}

export async function logIn(data) {
  try {
    const errors = await validateForm(data);

    if (errors.length !== 0) {
      return errors;
    }

    const url = await createUrlWithQueryParams('/auth/');
    const response = await POST(url, data);

    if (errors.length !== 0) {
      return errors;
    }

    await setAuthorization(response);

    return [];
  } catch (e) {
    return [{ field: 'form', message: e.data.detail }];
  }
}

export async function logOut() {
  await setAuthorization(null);

  return redirect('/auth');
}
