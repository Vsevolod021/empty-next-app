'use client';

import { logOut } from '@/api/api';

const Button = () => {
  return <button onClick={logOut}>Log out</button>;
};

export default Button;
