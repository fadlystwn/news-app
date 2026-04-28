"use client";

import register from '@/actions/register';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/components/Toast/ToastContext';

const initialState = {
  message: ''
}

export default function RegisterPage() {

  const [state, formAction] = useFormState(register, initialState)
  const { addToast } = useToast();

  useEffect(() => {
    if (state?.message) {
      addToast(state.message, 'error');
    }
  }, [state, addToast]);

  const inputClass = "w-full p-3 mb-1 border border-gray-300 rounded-xl bg-gray-50 font-sans dark:bg-gray-800 dark:border-gray-600 dark:text-white";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-black">
      <form className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-sm" action={formAction}>
        <h2>Register</h2>
        <div className="mb-3">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className={inputClass}
            required
          />
          <p aria-live="polite" className="error-field sr-only">
            {state?.errors?.name}
          </p>
        </div>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={inputClass}
            required
          />
          <p aria-live="polite" className="error-field sr-only">
            {state?.errors?.email}
          </p>
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={inputClass}
            required
          />
          <p aria-live="polite" className="error-field sr-only">
            {state?.errors?.confirmpassword}
          </p>
        </div>
        <div className="mb-3">
          <input
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            className={inputClass}
            required
          />
        </div>
        <p aria-live="polite" className="error-field sr-only">
          {state?.errors?.confirmpassword}
        </p>
        <button type="submit" className="w-full p-3 bg-gray-800 border border-blue-600 rounded-xl text-white text-base font-sans cursor-pointer transition-colors hover:bg-blue-600 hover:border-blue-700 active:bg-blue-700 dark:bg-blue-600 dark:border-blue-500">
          Register
        </button>
      </form>
    </div>
  );
}
