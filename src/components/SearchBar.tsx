"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({
  categories,
}: {
  categories: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "all") params.set("category", category);
    router.push(`/s?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-1 rounded-sm overflow-hidden">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Search category"
        className="hidden shrink-0 border-r border-gray-300 bg-gray-100 px-2 text-sm text-black sm:block"
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search amazan"
        aria-label="Search"
        className="w-full min-w-0 flex-1 px-3 py-2 text-black outline-none"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="shrink-0 bg-accent px-4 hover:bg-accent-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            stroke="#131921"
            strokeWidth="2"
            strokeLinecap="round"
            d="m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
          />
        </svg>
      </button>
    </form>
  );
}
