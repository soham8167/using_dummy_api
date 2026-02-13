"use client";
import { Bookmark02Icon, Bookmark03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Post } from "@/type/item";
import { useFavorites } from "@/context/FavoritesContext";

interface CardProps {
  post: Post;
}

export default function Card({ post }: CardProps) {
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();

  const handleToggleFavorite = () => {
    if (isFavorite(post.id)) {
      removeFavorite(post.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite(post);
      toast.success("Added to favorites");
    }
  };

  const favorite = isFavorite(post.id);

  return (
    <article className="h-full flex flex-col rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600">
      <div className="flex flex-col h-full p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between mb-3 gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap">
            Post {post.id}
          </span>

          <button
            onClick={handleToggleFavorite}
            className="cursor-pointer p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition shrink-0"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <HugeiconsIcon
              icon={favorite ? Bookmark03Icon : Bookmark02Icon}
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
            />
          </button>
        </div>

        <h2 className="mb-3 text-base sm:text-lg md:text-xl font-bold leading-tight text-gray-900 line-clamp-3 sm:line-clamp-4 dark:text-white">
          {post.title}
        </h2>

        <div className="mt-auto pt-4">
          <Link
            href={`/posts/${post.id}`}
            className="w-full inline-block text-center px-3 sm:px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 transition"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
