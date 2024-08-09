"use client";

import register from '@/actions/register'; // Assuming you have a register action similar to login
import styles from './register.module.css';
import { useFormState } from 'react-dom';

const initialState = {
  message: ''
}

export default function RegisterPage() {

  const [state, formAction] = useFormState(register, initialState)

  return (
    <div className={styles.container}>
      <form className={styles.form} action={formAction}>
        <h2>Register</h2>
        <div className={styles.inputGroup}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className={styles.input}
            required
          />
          <p aria-live="polite" className="error-field sr-only">
            {state?.errors?.name}
          </p>
        </div>
        <div className={styles.inputGroup}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={styles.input}
            required
          />
          <p aria-live="polite" className="error-field sr-only">
            {state?.errors?.email}
          </p>
        </div>
        <div className={styles.inputGroup}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={styles.input}
            required
          />
          <p aria-live="polite" className="error-field sr-only">
            {state?.errors?.confirmpassword}
          </p>
        </div>
        <div className={styles.inputGroup}>
          <input
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            required
          />
        </div>
        <p aria-live="polite" className="error-field sr-only">
          {state?.errors?.confirmpassword}
        </p>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}
