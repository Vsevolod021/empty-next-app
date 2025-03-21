'use client';

import { logOut } from '@/actions/auth';

const Button = () => {
  return <button onClick={logOut}>Log out</button>;
};

export default Button;
