import { FC } from 'react';
import Image from 'next/image';
import { News } from '@/types/news';
import React from 'react'

type NewsProps = {
  news: News
}

const NewsComponent: FC<NewsProps> = ({ news }) => {
  return (
    <div className="max-w-3xl mx-auto px-5 py-6">
      <h1 className="text-4xl font-bold mb-5">{news.title}</h1>
      {news.imageUrl && <Image className="w-full h-auto mb-5" src={news.imageUrl} alt={news.headline || news.title} width={640} height={640} />}
      <p className="text-lg leading-relaxed mb-5">{news.content}</p>
      <p className="text-sm text-gray-500">Published on: {new Date(news.createdAt).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Updated on: {new Date(news.updatedAt).toLocaleDateString()}</p>
    </div>
  );
}

export default NewsComponent