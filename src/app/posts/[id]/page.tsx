import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { id: string } | Promise<{ id: string }> };

export default async function PostPage({ params }: Props) {
  const resolvedParams = (await params) as { id?: string };
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch post (status: ${res.status})`);
    }

    const post: { id: number; title: string; body: string } = await res.json();

    return (
      <div className="min-h-screen flex items-start justify-center pt-20 pb-10 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 sm:p-6 md:p-8">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Post {post.id}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {post.title}
              </h2>
            </div>

            <div className="shrink-0">
              <Link
                href="/"
                className="inline-flex items-center px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 text-sm sm:text-base whitespace-nowrap"
              >
                Back
              </Link>
            </div>
          </header>

          <main className="text-gray-700 dark:text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed">
            <article className="space-y-4">
              <p className="whitespace-pre-wrap">{post.body}</p>
            </article>
          </main>
        </div>
      </div>
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    return (
      <div className="min-h-screen flex items-center justify-center pt-20 p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-red-600 dark:text-red-500 mb-2">
            Unable to load post
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {message}
          </p>
          <div>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 text-sm sm:text-base"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
