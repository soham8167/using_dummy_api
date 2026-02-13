"use client";

import { useQuery } from "@tanstack/react-query";
import Card from "@/components/Card";
import { fetchPosts } from "@/services/api";
import { Post } from "@/type/item";

export default function Home() {
  const {
    data: posts = [],
    isPending,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const errorMessage =
    error instanceof Error ? error.message : "Failed to fetch posts";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            All Posts
          </h1>
        </div>

        {/* Loading */}
        {isPending && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading posts...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && !isPending && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Posts
            </h2>
            <p className="text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Grid */}
        {!isPending && !isError && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {posts.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isPending && !isError && posts.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No posts found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
