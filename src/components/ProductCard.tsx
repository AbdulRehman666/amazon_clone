import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import { formatCents } from "@/lib/money";
import type { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  const images = JSON.parse(product.images) as string[];
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex h-full flex-col rounded-lg border border-transparent bg-white p-4 transition hover:border-gray-200 hover:shadow-md"
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-md bg-gray-50">
        <Image
          src={images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-cover"
        />
      </div>
      <p className="line-clamp-2 text-sm text-gray-900">{product.title}</p>
      <div className="mt-1">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-lg font-medium">{formatCents(product.priceCents)}</span>
        {product.listPriceCents && (
          <span className="text-sm text-gray-500 line-through">
            {formatCents(product.listPriceCents)}
          </span>
        )}
      </div>
      <div className="mt-auto pt-2 text-xs text-gray-600">
        FREE delivery <span className="font-semibold text-gray-800">tomorrow</span>
      </div>
    </Link>
  );
}
