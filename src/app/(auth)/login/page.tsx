"use client"
import { redirect } from 'next/navigation';
import login from './actions';
import styles from './login.module.css';

const LoginPage = () => {

  async function handleAction(formData: FormData) {
    //validation here
    await login(formData)
    redirect('/news')
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} action={handleAction}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage
