'use server';

import { setCookies, deleteCookies, getCookies } from '@/actions/cookies';
import authStore, { jsonHeaders, cookiesOptions } from '@/store/auth';
import { createUrlWithQueryParams, GET, POST } from '@/api/api';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// token

export async function setAuthorization(tokens) {
  authStore.setLastRefreshDate(new Date());

  if (tokens) {
    await setCookies('tokens', tokens, cookiesOptions);
    return;
  }

  await deleteCookies();
}

export async function refreshAccessToken() {
  const error = new Error('Ошибка при обновлении токена авторизации');

  const tokens = await getCookies();

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
    redirect('/logout');
  }

  throw new Error('Время сессии истекло');
}

async function checkAccessToken() {
  const tokens = await getCookies();

  if (!tokens) {
    throw new Error('Ошибка при обновлении токена авторизации');
  }

  const tokenData = jwtDecode(tokens.access);
  const tokenExpirationDate = new Date(tokenData.exp * 1000);
  const timeToTokenExporation = tokenExpirationDate.getTime() - new Date().getTime();

  if (timeToTokenExporation <= 0) {
    return await sessionExpired(false);
  }

  return await refreshAccessToken();
}

// profile

export async function checkAuthorized() {
  try {
    return await checkAccessToken();
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
