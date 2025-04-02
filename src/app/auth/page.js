'use server';

import AuthForm from './Form';

async function Page() {
  return (
    <div className="auth-page">
      <AuthForm />
    </div>
  );
}

export default Page;
