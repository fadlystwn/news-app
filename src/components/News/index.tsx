'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_3fr_1fr] gap-5 max-w-[1200px] mx-auto px-4 py-4">
        {news.map((post) => {

          return (
            (
              <Link key={post.id} href={`/news/${post.id}`}>
                <div key={post.id} className="p-4 bg-white dark:bg-gray-800 overflow-hidden">
                  {post.imageUrl && (
                    <Image
                      src={encodeURI(post.imageUrl)}
                      alt={post.title}
                      className="w-full h-auto border-b border-gray-200 mb-3"
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
        <div className="h-12 text-center bg-gray-200 dark:bg-gray-700 pt-4 my-4"><p>Loading...</p></div>
      )}
      {hasMore && !loading && (
        <div ref={loaderRef} className="h-12 text-center bg-gray-200 dark:bg-gray-700 pt-4 my-4"><p>Load more...</p></div>
      )}
      {showEndMessage && !loading && (
        <div className="h-12 text-center bg-gray-100 dark:bg-gray-800 pt-4 my-4 text-gray-500"><p>No more news.</p></div>
      )}
    </>
  );
};

export default NewsPage;
