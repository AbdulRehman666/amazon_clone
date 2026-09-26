"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS: { key: string; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price_asc", label: "Price: Low to High" },
  { key: "price_desc", label: "Price: High to Low" },
  { key: "rating", label: "Avg. Customer Review" },
  { key: "newest", label: "Newest Arrivals" },
];

export default function SortSelect({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "featured") params.delete("sort");
    else params.set("sort", e.target.value);
    router.push(`/s?${params.toString()}`);
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded border border-line px-2 py-1"
      aria-label="Sort by"
    >
      {OPTIONS.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
