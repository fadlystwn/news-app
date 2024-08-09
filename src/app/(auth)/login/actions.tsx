'use server';
import { z } from 'zod'
import prisma from '@/lib/db';
import { handleSesion } from '@/lib/auth';
import { compare } from 'bcrypt';
import { redirect } from 'next/navigation';

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})

export default async function login(prevState: any, formData: FormData) {

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    if (!user) {
      return { message: 'User not found!' };
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return { message: 'Invalid password!' };
    }

    const sessionData = { userId: user.id, email: user.email };
    await handleSesion(sessionData);

  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Find User.' };
  }

  redirect('/profile')
}