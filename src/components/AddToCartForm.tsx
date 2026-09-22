"use client";

import { useState } from "react";
import { addToCartAction, buyNowAction } from "@/app/actions/cart";

export default function AddToCartForm({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-4 space-y-2">
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
        aria-label="Quantity"
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            Qty: {n}
          </option>
        ))}
      </select>

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
          className="w-full rounded-full bg-accent px-4 py-2 text-sm font-medium hover:bg-accent-dark"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </form>

      <form action={buyNowAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity} />
        <button
          type="submit"
          className="w-full rounded-full bg-[#ffa41c] px-4 py-2 text-sm font-medium hover:bg-[#e5901a]"
        >
          Buy Now
        </button>
      </form>
    </div>
  );
}
