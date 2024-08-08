import React from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import styles from './news.module.css';

const Blog: React.FC = () => {
  const { posts, loading, hasMore, loadMoreTriggerRef } = useInfiniteScroll(10);

  return (
    <div className={styles.gridContainer}>
      {posts.map((post) => (
        <div key={post.id} className={styles.gridItem}>
          <img
            src={post.image}
            alt={post.title}
            className={styles.image}
          />
          <h2>{post.title}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      ))}
      <div ref={loadMoreTriggerRef} className={styles.loadMoreTrigger}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Blog;
