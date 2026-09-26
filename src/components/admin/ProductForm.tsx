"use client";

import { useActionState } from "react";
import { createProductAction, updateProductAction } from "@/app/actions/admin";
import type { Product } from "@prisma/client";

const inputClass =
  "w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand";
const labelClass = "mb-1 block text-sm text-muted";

export default function ProductForm({
  categories,
  product,
}: {
  categories: { id: string; name: string }[];
  product?: Product;
}) {
  const action = product ? updateProductAction : createProductAction;
  const [state, formAction, pending] = useActionState(action, undefined);
  const images = product ? (JSON.parse(product.images) as string[]) : [];
  const bullets = product ? (JSON.parse(product.bullets) as string[]) : [];

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {product && <input type="hidden" name="productId" value={product.id} />}
      {state?.error && (
        <p className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-success">
          Saved.
        </p>
      )}

      <div>
        <label className={labelClass}>Title</label>
        <input name="title" required defaultValue={product?.title} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Brand</label>
          <input name="brand" required defaultValue={product?.brand} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Price (USD)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product ? (product.priceCents / 100).toFixed(2) : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>List price (optional)</label>
          <input
            name="listPrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.listPriceCents ? (product.listPriceCents / 100).toFixed(2) : undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? 50}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={product?.description}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Highlights (one per line)</label>
        <textarea
          name="bullets"
          rows={4}
          defaultValue={bullets.join("\n")}
          className={inputClass}
          placeholder={"Hybrid ANC blocks 98% of noise\n40-hour battery life"}
        />
      </div>

      <div>
        <label className={labelClass}>Image URLs (one per line)</label>
        <textarea
          name="images"
          required
          rows={3}
          defaultValue={images.join("\n")}
          className={inputClass}
          placeholder="https://images.unsplash.com/photo-..."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-brand disabled:opacity-50"
      >
        {pending ? "Saving..." : product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
