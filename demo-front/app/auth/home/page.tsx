"use client";

import { usePosts } from "@/context/posts";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spinner,
  Skeleton,
  Divider,
} from "@heroui/react";

export default function Home() {
  const { posts, loading, loadMore, hasMore } = usePosts();

  return (
    <div className="flex-1 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {loading && posts.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-4 border border-neutral-300 rounded-lg shadow-sm"
              >
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          : posts.map((post) => (
              <Card>
                <CardHeader className="justify-between p-4">
                  <div className="flex gap-5">
                    <h4 className="text-large font-semibold leading-none text-default-600">
                      {post.title}
                    </h4>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="px-4 py-2 text-medium text-default-400">
                  <p>{post.body}</p>
                </CardBody>
                <CardFooter className="gap-3 p-4">
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      {post.views}
                    </p>
                    <p className=" text-default-400 text-small">Views</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      {post.reactions.likes}
                    </p>
                    <p className="text-default-400 text-small">Likes</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
      </div>
      {loading && posts.length > 0 && (
        <div className="mt-4">
          <Spinner size="lg" />
        </div>
      )}
      {hasMore && !loading && (
        <Button
          className="mt-6"
          color="primary"
          onPress={loadMore}
          isDisabled={loading}
        >
          {loading ? "Carregando..." : "Carregar mais"}
        </Button>
      )}
      {!hasMore && !loading && (
        <p className="mt-6 text-neutral-500">
          Todos os posts foram carregados.
        </p>
      )}
    </div>
  );
}
