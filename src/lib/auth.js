import 'server-only';

const sec = 1000;
const min = sec * 60;

export const TOKEN_MAX_AGE = (30 * min) / sec;
export const REFRESH_MAX_AGE = 25 * min;

export const cookiesOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none', // Не забыть поменять
  path: '/',
  maxAge: TOKEN_MAX_AGE
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
