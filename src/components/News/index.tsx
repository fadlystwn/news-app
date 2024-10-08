'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './news.module.css';
import { News } from '../../types/news';

type NewsProps = {
  initialData: News[];
  initialPage: number;
}

const NewsPage: React.FC<NewsProps> = ({ initialData, initialPage }) => {
  const [news, setNews] = useState<News[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showEndMessage, setShowEndMessage] = useState(false); // Added state
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/news/api?page=${nextPage}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!Array.isArray(result)) {
        throw new TypeError('Expected an array of news items');
      }

      const newsData: News[] = result.map((item: any) => ({
        ...item,
        author: item.author || 'Unknown',
      }));

      if (newsData.length === 0) {
        setHasMore(false);
        setShowEndMessage(true);
      } else {
        setNews(prevNews => [...prevNews, ...newsData]);
        setCurrentPage(nextPage);
        setShowEndMessage(false);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentPage]);

  useEffect(() => {
    // Capture the current loaderRef value
    const loaderElement = loaderRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreData();
        }
      },
      {
        rootMargin: '100px',
      }
    );

    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement);
      }
    };
  }, [fetchMoreData]);

  return (
    <>
      <div className={styles.gridContainer}>
        {news.map((post) => {

          return (
            (
              <Link key={post.id} href={`/news/${post.id}`}>
                <div key={post.id} className={styles.gridItem}>
                  {post.imageUrl && (
                    <Image
                      src={encodeURI(post.imageUrl)}
                      alt={post.title}
                      className={styles.image}
                      width={640}
                      height={320}
                    />
                  )}
                  <h2>{post.title}</h2>
                  <p>{post?.author}</p>
                  <p>{post.headline}</p>
                </div>
              </Link>
            )
          )
        })}
      </div>
      {loading && (
        <div className={styles.loader}><p>Loading...</p></div>
      )}
      {hasMore && !loading && (
        <div ref={loaderRef} className={styles.loader}><p>Load more...</p></div>
      )}
      {showEndMessage && !loading && (
        <div className={styles.endMessage}><p>No more news.</p></div>
      )}
    </>
  );
};

export default NewsPage;
