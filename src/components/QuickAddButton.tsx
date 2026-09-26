"use client";

import { useState, useTransition } from "react";
import { addToCartAction } from "@/app/actions/cart";

export default function QuickAddButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const fd = new FormData();
    fd.set("productId", productId);
    fd.set("quantity", "1");
    startTransition(async () => {
      await addToCartAction(fd);
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label="Quick add to bag"
      className={`absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 hover:bg-brand hover:scale-110 active:scale-95 ${added ? "animate-pop bg-success opacity-100" : ""}`}
    >
      {added ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 5v14M5 12h14" />
        </svg>
      )}
    </button>
  );
}
