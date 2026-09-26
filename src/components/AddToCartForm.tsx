"use client";

import { useState } from "react";
import { addToCartAction, buyNowAction } from "@/app/actions/cart";

export default function AddToCartForm({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">Quantity</span>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="rounded-full border border-line px-3 py-1.5 text-sm"
          aria-label="Quantity"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <form
        action={async (formData) => {
          await addToCartAction(formData);
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
      >
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity} />
        <button
          type="submit"
          className={`w-full rounded-full px-4 py-3 text-sm font-medium text-paper shadow-lg shadow-ink/10 transition-all hover:scale-[1.02] hover:bg-brand active:scale-95 ${
            added ? "animate-pop bg-success" : "bg-ink"
          }`}
        >
          {added ? "Added to bag ✓" : "Add to bag"}
        </button>
      </form>

      <form action={buyNowAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity} />
        <button
          type="submit"
          className="w-full rounded-full border border-line px-4 py-3 text-sm font-medium transition-all hover:scale-[1.02] hover:border-ink hover:bg-ink/5 active:scale-95"
        >
          Buy now
        </button>
      </form>
    </div>
  );
}
