'use server';

import { responseTypes, jsonHeaders, REFRESH_MAX_AGE } from '@/lib/auth';
import { refreshAccessToken, sessionExpired } from '@/actions/auth';
import { getTokensFromCookies } from '@/actions/cookies';
import { dateDifference } from '@/utils/helpers';
import { apiEndpoint } from '@/config';
import { jwtDecode } from 'jwt-decode';
import qs from 'qs';

export async function fetchData(url, params, responseType = responseTypes.JSON) {
  const isFormData = params.body instanceof FormData;

  const headers = new Headers(isFormData ? {} : jsonHeaders);
  const body = isFormData ? params.body : JSON.stringify(params.body);

  const cookiesData = await getTokensFromCookies();
  const accessToken = cookiesData?.access;

  if (accessToken) {
    const tokenData = jwtDecode(accessToken);
    const tokenIssuedTime = new Date(tokenData.iat * 1000);

    const timeFromLastRefresh = dateDifference(tokenIssuedTime);

    if (timeFromLastRefresh >= REFRESH_MAX_AGE) {
      await refreshAccessToken();
    }

    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const timeoutDuration = params.method.toUpperCase() === 'GET' ? 30000 : 180000;
  const signal = AbortSignal.timeout(timeoutDuration);

  try {
    const request = { ...params, body, headers, signal, redirect: 'follow' };
    const response = await fetch(url, request);

    if (response.status === 401) {
      if (!url.pathname.includes('/auth')) {
        return sessionExpired(true);
      }
    }

    if (response.status === 500) {
      const errorMessage = 'Ошибка сервера';
      const error = new Error(errorMessage);
      error.data = errorMessage;

      throw error;
    }

    if (!response.ok) {
      const error = new Error('Ошибка запроса');
      const response = await response.json();

      error.data = response.detail;

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
