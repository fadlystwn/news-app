'use server';
import { z } from 'zod';
import prisma from '@/lib/db';
import { hash } from 'bcrypt';
import { handleSesion } from '@/lib/auth';
import { redirect } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid Email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmpassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
});

export default async function register(prevState: any, formData: FormData) {

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmpassword: formData.get('confirmpassword'),
  });

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmpassword = formData.get('confirmpassword') as string;

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (password !== confirmpassword) {
    return { message: 'Passwords do not match!' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { message: 'User already exists!' };
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const sessionData = { userId: newUser.id, email: newUser.email };
    await handleSesion(sessionData);

  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Register User.' };
  }

  redirect('/profile');
}
