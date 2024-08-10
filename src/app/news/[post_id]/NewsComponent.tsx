import { FC } from 'react';
import Image from 'next/image';
import { News } from '@/types/news';
import React from 'react'
import styles from './news.module.css';

type NewsProps = {
  news: News
}

const NewsComponent: FC<NewsProps> = ({ news }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{news.title}</h1>
      {news.imageUrl && <Image className={styles.image} src={news.imageUrl} alt={news.headline || news.title} width={640} height={640} />}
      <p className={styles.content}>{news.content}</p>
      <p className={styles.date}>Published on: {new Date(news.createdAt).toLocaleDateString()}</p>
      <p className={styles.date}>Updated on: {new Date(news.updatedAt).toLocaleDateString()}</p>
    </div>
  );
}

export default NewsComponent