'use client';

import { checkAuthorized } from '@/actions/auth';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/favicon.ico';
import '@/assets/index.sass';

export default function RootLayout({ children }) {
  useEffect(() => {
    checkAuthorized();
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
