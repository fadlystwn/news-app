import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = 6;

  try {
    const data = await prisma.news.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Return data even if it's an empty array
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    return NextResponse.json({ message: 'Error fetching data!' }, { status: 500 });
  }
}
