import { useState, useEffect, useRef, useCallback } from 'react';

// Define the type for blog posts
interface Post {
  id: number;
  title: string;
  image: string;
}

// Mock function to fetch more blog posts
const fetchMorePosts = (page: number): Promise<Post[]> => {
  // Simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: page * 3 + 1, title: 'Blog Post ' + (page * 3 + 1), image: 'https://via.placeholder.com/300x200?text=Blog+Post+' + (page * 3 + 1) },
        { id: page * 3 + 2, title: 'Blog Post ' + (page * 3 + 2), image: 'https://via.placeholder.com/600x400?text=Blog+Post+' + (page * 3 + 2) },
        { id: page * 3 + 3, title: 'Blog Post ' + (page * 3 + 3), image: 'https://via.placeholder.com/300x200?text=Blog+Post+' + (page * 3 + 3) },
      ]);
    }, 1000);
  });
};

const useInfiniteScroll = (initialPage: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newPosts = await fetchMorePosts(page);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
    if (newPosts.length === 0) setHasMore(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadMorePosts();
      }
    };

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    if (loadMoreTriggerRef.current) {
      observer.current = new IntersectionObserver(handleIntersection, options);
      observer.current.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (observer.current && loadMoreTriggerRef.current) {
        observer.current.unobserve(loadMoreTriggerRef.current);
      }
    };
  }, [loadMorePosts]);

  return { posts, loading, hasMore, loadMoreTriggerRef };
};

export default useInfiniteScroll;
