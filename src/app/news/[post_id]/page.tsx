import prisma from "@/lib/db";
import { News } from '@/types/news';
import Navigation from "@/components/Navigation";
import NewsComponent from "./NewsComponent";

async function fetchData(post_id: string): Promise<News | null> {
  try {
    const news = await prisma.news.findUnique({
      where: { id: parseInt(post_id, 10) },
    });
    return news;
  } catch (err) {
    console.error('Error fetching data:', err);
    return null; // Return null instead of an empty array
  }
}

export default async function page({ params }: { params: { post_id: string } }) {
  const { post_id } = params;
  const news = await fetchData(post_id);

  if (!news) {
    return <div>Not found!</div>;
  }

  return (
    <>
      <Navigation />
      <NewsComponent news={news} />
    </>
  );
}
