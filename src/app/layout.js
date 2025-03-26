'use client';

import Link from 'next/link';

import { checkAuthorized } from '@/actions/auth';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    checkAuthorized();
  }, []);

  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <Link href="/profile">profile</Link>
          <Link href="/albums">albums</Link>
          <Link href="/auth">auth</Link>
        </div>

        {children}
      </body>
    </html>
  );
}
