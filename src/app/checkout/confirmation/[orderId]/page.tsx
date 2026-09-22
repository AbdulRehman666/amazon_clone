import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { formatCents } from "@/lib/money";

export default async function OrderConfirmationPage({
  params,
}: PageProps<"/checkout/confirmation/[orderId]">) {
  const { orderId } = await params;
  const userId = await getSessionUserId();
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, address: true },
  });
  if (!order || order.userId !== userId) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-8 w-8">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-medium">Order placed, thank you!</h1>
      <p className="mt-1 text-gray-600">Confirmation email sent (not really — this is a demo).</p>

      <div className="mt-6 rounded-md bg-white p-4 text-left shadow-sm">
        <div className="mb-3 flex justify-between text-sm text-gray-600">
          <span>Order # {order.id}</span>
          <span>{order.createdAt.toLocaleDateString()}</span>
        </div>
        <ul className="mb-3 divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 text-sm">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatCents(item.priceCents * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-1 border-t border-gray-200 pt-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCents(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shippingCents === 0 ? "FREE" : formatCents(order.shippingCents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatCents(order.taxCents)}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>{formatCents(order.totalCents)}</span>
          </div>
        </div>
        <div className="mt-3 border-t border-gray-200 pt-2 text-sm text-gray-700">
          Shipping to {order.address.fullName}, {order.address.line1}, {order.address.city}
        </div>
        <div className="text-sm text-gray-700">
          Paid with {order.cardBrand} ending in {order.cardLast4}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Link href="/account/orders" className="rounded-full bg-accent px-4 py-2 text-sm font-medium hover:bg-accent-dark">
          View your orders
        </Link>
        <Link href="/" className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
