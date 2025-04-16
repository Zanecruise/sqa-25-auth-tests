"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getPosts } from "@/service/posts";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
};

type PostsContextType = {
  posts: Post[];
  loading: boolean;
  loadMore: () => void;
  hasMore: boolean;
  resetPosts: () => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (currentPage: number) => {
    setLoading(true);
    try {
      const data = await getPosts(currentPage);
      setPosts((prev) => [...prev, ...data.posts]);
      setHasMore(posts.length + data.posts.length < data.total);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const resetPosts = () => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <PostsContext.Provider
      value={{ posts, loading, loadMore, hasMore, resetPosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts deve ser usado dentro de PostsProvider");
  }
  return context;
};
