import { getCookies } from '@/actions/cookies';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const cookies = await getCookies();

  console.log(request.nextUrl.pathname);

  if (!cookies?.access) {
    const url = new URL('/auth', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/albums', '/profile', '/']
};
