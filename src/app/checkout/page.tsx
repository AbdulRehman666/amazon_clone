import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getHydratedCart } from "@/lib/cart";
import { formatCents } from "@/lib/money";
import CheckoutForm from "@/components/CheckoutForm";

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 3500;
const FLAT_SHIPPING = 599;

export default async function CheckoutPage() {
  const lines = await getHydratedCart();
  if (lines.length === 0) redirect("/cart");

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotalCents = lines.reduce((sum, l) => sum + l.product.priceCents * l.quantity, 0);
  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + shippingCents + taxCents;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-3xl">Checkout</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <CheckoutForm />

        <div className="h-fit space-y-6">
          <div className="rounded-2xl border border-line p-6">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
              Order summary
            </h2>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Items ({itemCount})</span>
                <span>{formatCents(subtotalCents)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span>{shippingCents === 0 ? "Free" : formatCents(shippingCents)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Estimated tax</span>
                <span>{formatCents(taxCents)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-line pt-2 text-base font-medium">
                <span>Total</span>
                <span>{formatCents(totalCents)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line p-6">
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
              In your order
            </h3>
            <ul className="space-y-3">
              {lines.map(({ product, quantity }) => {
                const images = JSON.parse(product.images) as string[];
                return (
                  <li key={product.id} className="flex gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-line/40">
                      <Image src={images[0]} alt={product.title} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 text-sm">
                      <p className="line-clamp-2">{product.title}</p>
                      <p className="text-muted">
                        Qty {quantity} · {formatCents(product.priceCents)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href="/cart" className="mt-4 inline-block text-sm text-brand hover:underline">
              Edit bag
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
