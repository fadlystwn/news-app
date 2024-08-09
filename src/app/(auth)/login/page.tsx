"use client";

import login from '@/actions/login';
import styles from './login.module.css';
import { useFormState } from 'react-dom';

const initialState = {
  message: ''
}

export default function LoginPage() {

  const [state, formAction] = useFormState(login, initialState)
  console.log(state)

  return (
    <div className={styles.container}>
      <form className={styles.form} action={formAction}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={styles.input}
            required
          />

        </div>
        <div className={styles.inputGroup}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
            required
          />
        </div>
        <p aria-live="polite" className="error-field sr-only">
          {state?.message}
        </p>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
