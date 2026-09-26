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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    const category = searchParams.get("category");
    if (category) params.set("category", category);
    router.push(`/s?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 focus-within:border-brand"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-muted">
        <path
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          d="m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Marlo"
        aria-label="Search"
        className="w-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
      />
      {categories.length > 0 && (
        <span className="hidden shrink-0 text-xs text-muted sm:inline">
          {categories.length} departments
        </span>
      )}
    </form>
  );
}
