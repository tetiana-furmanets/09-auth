// app/(auth routes)/sign-up/page.tsx
import React from 'react';
import css from './SignUp.module.css';

export default function SignUpPage() {
  return (
    <div className={css.container}>
      <input className={css.input} type="text" placeholder="Username" />
      <input className={css.input} type="email" placeholder="Email" />
      <input className={css.input} type="password" placeholder="Password" />
      <button className={css.button}>Sign Up</button>
    </div>
  );
}