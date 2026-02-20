// app/(auth routes)/sign-in/page.tsx
import React from 'react';
import css from './SignIn.module.css';

export default function SignInPage() {
  return (
    <div className={css.container}>
      <input className={css.input} type="email" placeholder="Email" />
      <input className={css.input} type="password" placeholder="Password" />
      <button className={css.button}>Sign In</button>
    </div>
  );
}