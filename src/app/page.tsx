import Navigation from "@/components/Navigation";
import NewsPage from "@/components/News";
import prisma from '@/lib/db';

async function getData(page = 1, pageSize = 6) {
  try {
    const news = await prisma.news.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return news;
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Navigation />
      <NewsPage initialData={data} initialPage={1} />
    </>
  );
}
