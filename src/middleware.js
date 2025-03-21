import { getCookies } from '@/actions/cookies';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const cookies = await getCookies();

  if (!cookies?.access) {
    const url = new URL('/auth', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!auth).*)']
};
