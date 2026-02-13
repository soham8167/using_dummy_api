"use client";

import  { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bookmark03Icon, Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import toast from "react-hot-toast";
import { useFavorites } from "@/context/FavoritesContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { favorites, removeFavorite } = useFavorites();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target))
        setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleRemove = (id: number) => {
    removeFavorite(id);
    toast.success("Removed from favorites");
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between container max-w-7xl h-16 items-center px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Home Link */}
        <Link
          href="/"
          className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Home
        </Link>

        {/* Bookmark Dropdown */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition relative"
            aria-label="Show favorites"
          >
            <HugeiconsIcon
              icon={Bookmark03Icon}
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
            />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {favorites.length}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Favorites
                </h3>
              </div>

              {favorites.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No favorites yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-72">
                  {favorites.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start justify-between p-3 border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Post #{post.id}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(post.id)}
                        className="ml-2 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
                        aria-label="Remove from favorites"
                      >
                        <HugeiconsIcon
                          icon={Delete01Icon}
                          className="w-4 h-4 text-red-600 dark:text-red-400"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
