'use server';
import prisma from '@/lib/db';
import { handleSesion } from '@/lib/auth';
import { compare } from 'bcrypt'

export default async function login(formData: FormData) {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        message: 'User not found!',
      };
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return {
        message: 'Invalid password!',
      };
    }

    const sessionData = {
      userId: user.id,
      email: user.email,
    };

    await handleSesion(sessionData);

  } catch (err) {
    console.error('Database Error:', err);
    return {
      message: 'Database Error: Failed to Find User.',
    };
  }
}
