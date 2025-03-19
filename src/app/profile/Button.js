'use client';

import { logOut, checkAccessToken } from '@/api/api';
import { useEffect } from 'react';

const Button = () => {
  useEffect(() => {
    checkAccessToken();
  }, []);

  return <button onClick={logOut}>Log out</button>;
};

export default Button;
