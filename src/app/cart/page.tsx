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
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-md bg-white p-4 shadow-sm sm:p-6">
          <h1 className="mb-4 border-b border-gray-200 pb-3 text-2xl font-medium">
            Shopping Cart
          </h1>

          {lines.length === 0 ? (
            <div className="py-10 text-center">
              <p className="mb-4 text-lg">Your cart is empty.</p>
              <Link href="/" className="text-link hover:underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {lines.map(({ product, quantity }) => {
                const images = JSON.parse(product.images) as string[];
                return (
                  <li key={product.id} className="flex gap-4 py-4">
                    <Link href={`/product/${product.slug}`} className="relative h-28 w-28 shrink-0 overflow-hidden rounded bg-gray-50">
                      <Image src={images[0]} alt={product.title} fill sizes="112px" className="object-cover" />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/product/${product.slug}`} className="font-medium hover:text-link hover:underline">
                        {product.title}
                      </Link>
                      <p className="text-sm text-success">In Stock</p>
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
          <div className="h-fit rounded-md bg-white p-4 shadow-sm">
            <p className="text-lg">
              Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"}):{" "}
              <span className="font-bold">{formatCents(subtotalCents)}</span>
            </p>
            <Link
              href="/checkout"
              className="mt-3 block w-full rounded-full bg-accent px-4 py-2 text-center text-sm font-medium hover:bg-accent-dark"
            >
              Proceed to checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
