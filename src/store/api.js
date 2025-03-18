import 'server-only';

import { getCookies, setAuthorization } from '@/api/api';
import { redirect } from 'next/navigation';
import { makeAutoObservable } from 'mobx';
import { jwtDecode } from 'jwt-decode';

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

  get tokens() {
    return getCookies();
  }

  setLastRefreshDate(date) {
    this.lastRefreshDate = date;
    return this.lastRefreshDate;
  }

  async checkAccessToken() {
    const error = new Error('Ошибка при обновлении токена авторизации');

    if (!this.tokens) throw error;

    const tokenData = jwtDecode(this.tokens.access);
    const tokenExpirationDate = new Date(tokenData.exp * 1000);
    const timeToTokenExporation = tokenExpirationDate.getTime() - new Date().getTime();

    if (timeToTokenExporation <= 0) {
      return this.sessionExpired(false);
    }

    return await this.refreshAccessToken();
  }

  async refreshAccessToken() {
    const error = new Error('Ошибка при обновлении токена авторизации');

    if (!this.tokens) throw error;

    const headers = new Headers(jsonHeaders);
    const body = JSON.stringify({ refresh: this.tokens.refresh });
    const request = { body, headers, method: 'POST', redirect: 'follow' };
    const url = this.createUrlWithQueryParams('/token/refresh/');

    const response = await fetch(url, request);

    if (!response.ok) throw error;

    const result = await response.json();

    if (!result.access) throw error;

    setAuthorization({ access: result.access, refresh: this.tokens.refresh });
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
