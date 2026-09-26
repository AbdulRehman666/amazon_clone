import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import { formatCents } from "@/lib/money";
import type { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  const images = JSON.parse(product.images) as string[];
  return (
    <Link href={`/product/${product.slug}`} className="group flex h-full flex-col">
      <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-line/40">
        <Image
          src={images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 260px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {product.listPriceCents && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-paper">
            Sale
          </span>
        )}
      </div>
      <p className="text-[11px] uppercase tracking-wide text-muted">{product.brand}</p>
      <p className="line-clamp-2 text-sm text-ink">{product.title}</p>
      <div className="mt-1">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-medium text-ink">{formatCents(product.priceCents)}</span>
        {product.listPriceCents && (
          <span className="text-sm text-muted line-through">
            {formatCents(product.listPriceCents)}
          </span>
        )}
      </div>
    </Link>
  );
}
