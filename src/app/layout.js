'use client';

import { checkAuthorized, logOut } from '@/actions/auth';
import { usePathname } from 'next/navigation';
import { publicRoutes } from '@/config';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/favicon.ico';
import '@/assets/index.sass';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    checkAuthorized().then(async (res) => {
      if (res === true) return;

      if (pathname !== '/' && pathname !== '/auth') {
        return await logOut();
      }
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="header">
          <Link href="/" className="logo">
            <Image src={logo} alt="logo" width={40} height={40} />
          </Link>
          <Link href="/profile">profile</Link>
          <Link href="/groups">groups</Link>
          <Link href="/auth">auth</Link>
        </div>

        {children}
      </body>
    </html>
  );
}
