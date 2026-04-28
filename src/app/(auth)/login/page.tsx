"use client";

import login from '@/actions/login';
import { useFormState } from 'react-dom';

const initialState = {
  message: ''
}

export default function LoginPage() {

  const [state, formAction] = useFormState(login, initialState)
  console.log(state)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-black">
      <form className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-sm" action={formAction}>
        <h2>Login</h2>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl bg-gray-50 font-sans dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          />

        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl bg-gray-50 font-sans dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <p aria-live="polite" className="error-field sr-only">
          {state?.message}
        </p>
        <button type="submit" className="w-full p-3 bg-gray-800 border border-blue-600 rounded-xl text-white text-base font-sans cursor-pointer transition-colors hover:bg-blue-600 hover:border-blue-700 active:bg-blue-700 dark:bg-blue-600 dark:border-blue-500">
          Login
        </button>
      </form>
    </div>
  );
}
