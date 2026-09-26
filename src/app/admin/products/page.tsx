import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { deleteProductAction } from "@/app/actions/admin";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">{products.length} products</p>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-brand"
        >
          Add product
        </Link>
      </div>

      <ul className="divide-y divide-line rounded-2xl border border-line">
        {products.map((p) => {
          const images = JSON.parse(p.images) as string[];
          return (
            <li key={p.id} className="flex items-center gap-4 p-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-line/40">
                <Image src={images[0]} alt={p.title} fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.title}</p>
                <p className="text-xs text-muted">
                  {p.category.name} · {formatCents(p.priceCents)} · stock {p.stock}
                </p>
              </div>
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-ink"
              >
                Edit
              </Link>
              <form action={deleteProductAction}>
                <input type="hidden" name="productId" value={p.id} />
                <button
                  type="submit"
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-red-700 hover:border-red-300 hover:bg-red-50"
                >
                  Delete
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
