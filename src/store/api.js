import 'server-only';

import { getCookies, setAuthorization, createUrlWithQueryParams } from '@/api/api';
import { redirect } from 'next/navigation';
import { makeAutoObservable } from 'mobx';

const sec = 1000;
const min = sec * 60;

export const TOKEN_MAX_AGE = 30 * min;
export const REFRESH_MAX_AGE = 25 * min;

export const cookiesOptions = {
  httpOnly: true,
  secure: true,
  maxAge: TOKEN_MAX_AGE,
  sameSite: 'none',
  path: '/'
};

export const responseTypes = {
  ARRAY_BUFFER: 'arrayBuffer',
  JSON: 'json',
  BLOB: 'blob',
  TEXT: 'text'
};

export const jsonHeaders = {
  'Content-Type': 'application/json'
};

class Api {
  lastRefreshDate = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  setLastRefreshDate(date) {
    this.lastRefreshDate = date;
    return this.lastRefreshDate;
  }

  async refreshAccessToken() {
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

  async sessionExpired(doRedirect = false) {
    const errorText = 'Время сессии истекло';

    if (doRedirect) {
      redirect('/logout');
    }

    throw new Error(errorText);
  }
}

export default new Api();
