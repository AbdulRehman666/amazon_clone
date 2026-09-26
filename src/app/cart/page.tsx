import Link from "next/link";
import Image from "next/image";
import { getHydratedCart } from "@/lib/cart";
import { formatCents } from "@/lib/money";
import CartLineControls from "@/components/CartLineControls";

export default async function CartPage() {
  const lines = await getHydratedCart();
  const subtotalCents = lines.reduce((sum, l) => sum + l.product.priceCents * l.quantity, 0);
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-3xl">Your bag</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {lines.length === 0 ? (
            <div className="rounded-2xl border border-line py-16 text-center">
              <p className="mb-4 text-muted">Your bag is empty.</p>
              <Link href="/" className="text-brand hover:underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map(({ product, quantity }) => {
                const images = JSON.parse(product.images) as string[];
                return (
                  <li key={product.id} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-line/40"
                    >
                      <Image src={images[0]} alt={product.title} fill sizes="112px" className="object-cover" />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/product/${product.slug}`} className="font-medium hover:text-brand">
                        {product.title}
                      </Link>
                      <p className="text-sm text-success">In stock</p>
                      <CartLineControls productId={product.id} quantity={quantity} />
                    </div>
                    <div className="text-right font-medium">
                      {formatCents(product.priceCents * quantity)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="h-fit rounded-2xl border border-line p-6">
            <p className="text-sm text-muted">
              Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})
            </p>
            <p className="mt-1 text-2xl font-medium">{formatCents(subtotalCents)}</p>
            <Link
              href="/checkout"
              className="mt-4 block w-full rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-paper hover:bg-brand transition-all hover:scale-[1.02] active:scale-95"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
