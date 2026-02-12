import Link from "next/link";
import { Post } from "@/type/item";

interface CardProps {
  post: Post;
}

export default function Card({ post }: CardProps) {
  return (
    <article className="h-full flex flex-col rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600">
      <div className="flex flex-col h-full p-5 sm:p-6">
        {/* Header with ID Badge */}
        
        
<div className="flex items-start justify-between mb-3 gap-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold  bg-blue-100 ">
            Post {post.id}
          </span>
  <button className="cursor-pointer inline-block px-2 py-1 text-xs font-semibold  bg-blue-100">Add to favourite</button>

        </div>
        {/* Title */}
        <h2 className="mb-3 text-lg sm:text-xl font-bold leading-tight text-gray-900 line-clamp-4 dark:text-white">
          {post.title}
        </h2>


        <div className="mt-auto pt-4">
          <Link
            href={`/posts/${post.id}`}
            className="w-full sm:w-auto inline-block text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
