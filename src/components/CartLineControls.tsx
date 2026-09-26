"use client";

import { useTransition } from "react";
import { updateCartQuantityAction, removeFromCartAction } from "@/app/actions/cart";

export default function CartLineControls({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [isPending, startTransition] = useTransition();

  function handleQuantityChange(next: number) {
    const fd = new FormData();
    fd.set("productId", productId);
    fd.set("quantity", String(next));
    startTransition(() => {
      updateCartQuantityAction(fd);
    });
  }

  function handleRemove() {
    const fd = new FormData();
    fd.set("productId", productId);
    startTransition(() => {
      removeFromCartAction(fd);
    });
  }

  return (
    <div className={`mt-2 flex items-center gap-4 text-sm ${isPending ? "opacity-50" : ""}`}>
      <select
        value={quantity}
        onChange={(e) => handleQuantityChange(Number(e.target.value))}
        className="rounded-full border border-line px-3 py-1"
        aria-label="Quantity"
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            Qty: {n}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleRemove} className="text-muted hover:text-brand">
        Remove
      </button>
    </div>
  );
}
