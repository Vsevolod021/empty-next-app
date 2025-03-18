'use server';

import api, { cookiesOptions, responseTypes, jsonHeaders, REFRESH_MAX_AGE } from '@/store/api';
import { dateDifference } from '@/utils/helpers';
import { apiEndpoint } from '@/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import qs from 'qs';

export async function setAuthorization(tokens) {
  api.setLastRefreshDate(new Date());

  if (tokens) {
    await setCookies('tokens', tokens, cookiesOptions).then(() => console.log('ОЛ ИЗИ ФОР ИКТИЗИ'));
    return;
  }

  await deleteCookies().then(() => console.log('ОЛ ИЗИ ФОР ИКТИЗИ'));
}

export async function fetchData(url, params, responseType = responseTypes.JSON) {
  const isFormData = params.body instanceof FormData;

  const headers = new Headers(isFormData ? {} : jsonHeaders);
  const body = isFormData ? params.body : JSON.stringify(params.body);

  const authorization = 'Bearer ' + (await getCookies())?.access;

  if (authorization) {
    const timeFromLastRefresh = dateDifference(api.lastRefreshDate);

    if (timeFromLastRefresh >= REFRESH_MAX_AGE) {
      await api.refreshAccessToken();
    }

    headers.append('Authorization', authorization);
  }

  const timeoutDuration = params.method.toUpperCase() === 'GET' ? 30000 : 180000;
  const signal = AbortSignal.timeout(timeoutDuration);

  try {
    const request = { ...params, body, headers, signal, redirect: 'follow' };
    const response = await fetch(url, request);

    if (response.status === 401) {
      if (!url.pathname.includes('/auth')) {
        return api.sessionExpired(true);
      }
    }

    if (response.status === 500) {
      throw new Error('Ошибка сервера');
    }

    if (!response.ok) {
      const error = new Error('Ошибка запроса');
      error.data = await response.json();

      throw error;
    }

    if (response.status === 204) {
      return { status: true };
    }

    return await response[responseType]();
  } catch (e) {
    if (e == signal.reason) {
      throw new Error('Превышен лимит времени запроса');
    }
    throw e;
  }
}

export async function GET(url, body, responseType) {
  return await fetchData(url, { body, method: 'GET' }, responseType);
}

export async function POST(url, body, responseType) {
  return await fetchData(url, { body, method: 'POST' }, responseType);
}

export async function PATCH(url, body, responseType) {
  return await fetchData(url, { body, method: 'PATCH' }, responseType);
}

export async function DELETE(url, body, responseType) {
  return await fetchData(url, { body, method: 'DELETE' }, responseType);
}

export async function createUrlWithQueryParams(apiUrl, params = {}) {
  const url = new URL(apiEndpoint + apiUrl);

  url.search = qs.stringify(params);

  return url;
}

export async function logIn(data) {
  const url = await createUrlWithQueryParams('/auth/');
  const result = await POST(url, data);

  await setAuthorization(result).then(() => redirect('/profile'));

  return await 'authorizovan';
}

export async function setCookies(name, value, options = cookiesOptions) {
  const cookiesStorage = await cookies();

  return cookiesStorage.set({ name, value: JSON.stringify(value), ...options });
}

export async function getCookies() {
  const cookiesStorage = await cookies();

  try {
    return await JSON.parse(cookiesStorage.get('tokens')?.value);
  } catch {
    return '';
  }
}

export async function deleteCookies() {
  const cookiesStorage = await cookies();

  return cookiesStorage.delete('tokens');
}

export async function getProfileInfo() {
  const url = await createUrlWithQueryParams('/profile/');
  return await GET(url);
}

export async function logOut() {
  await setAuthorization(null);
}
