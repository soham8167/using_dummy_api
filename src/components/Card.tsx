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
          
        </div>

        {/* Title */}
        <h2 className="mb-3 text-lg sm:text-xl font-bold leading-tight text-gray-900 line-clamp-4 dark:text-white">
          {post.title}
        </h2>

        {/* Body */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-6">
          {post.body}
        </p>
      </div>
    </article>
  );
}
