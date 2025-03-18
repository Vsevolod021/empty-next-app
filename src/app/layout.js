'use client';

import Link from 'next/link';

export default function RootLayout({ children }) {
  // checkAccessToken();

  return (
    <html lang="en">
      <body>
        {
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <Link href="/profile">profile</Link>
            <Link href="/albums">albums</Link>
            <Link href="/auth">auth</Link>
          </div>
        }
        {children}
      </body>
    </html>
  );
}
