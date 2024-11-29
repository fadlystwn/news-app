'use server';
import { z } from 'zod';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.number().min(1, 'Author ID is required'),
  imageUrl: z.string().url('Invalid URL').optional(),
  headline: z.string().optional(),
});

export default async function createNews(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    authorId: parseInt(formData.get('authorId') as string, 10),
    imageUrl: formData.get('imageUrl') as string | undefined,
    headline: formData.get('headline') as string | undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, content, authorId, imageUrl, headline } = validatedFields.data;

  try {
    const existingAuthor = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!existingAuthor) {
      return { message: 'Author does not exist!' };
    }

    const newNews = await prisma.news.create({
      data: {
        title,
        content,
        authorId,
        imageUrl: imageUrl || null,
        headline: headline || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log('News Created:', newNews);

  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create News.' };
  }

  redirect('/news');
}
