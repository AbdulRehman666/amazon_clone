import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { formatCents } from "@/lib/money";
import OrderStatusBadge from "@/components/OrderStatusBadge";

export default async function OrderDetailPage({ params }: PageProps<"/account/orders/[id]">) {
  const { id } = await params;
  const userId = await getSessionUserId();
  if (!userId) redirect(`/login?redirect=/account/orders/${id}`);

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, address: true },
  });
  if (!order || order.userId !== userId) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/account/orders" className="text-sm text-brand hover:underline">
        &larr; Back to orders
      </Link>
      <div className="mt-3 mb-6 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl">Order details</h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="rounded-2xl border border-line p-6 ">
        <div className="mb-3 grid grid-cols-2 gap-2 border-b border-line pb-3 text-sm sm:grid-cols-4">
          <div>
            <p className="text-muted">Order placed</p>
            <p>{order.createdAt.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted">Total</p>
            <p>{formatCents(order.totalCents)}</p>
          </div>
          <div>
            <p className="text-muted">Ship to</p>
            <p>{order.address.fullName}</p>
          </div>
          <div>
            <p className="text-muted">Order #</p>
            <p className="truncate">{order.id}</p>
          </div>
        </div>

        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.id} className="flex gap-4 py-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-line/40">
                <Image src={item.imageUrl} alt={item.title} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <p>{item.title}</p>
                <p className="text-muted">Qty {item.quantity}</p>
              </div>
              <div className="text-sm font-medium">{formatCents(item.priceCents * item.quantity)}</div>
            </li>
          ))}
        </ul>

        <div className="mt-3 space-y-1 border-t border-line pt-2 text-sm">
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

        <div className="mt-3 border-t border-line pt-2 text-sm text-muted">
          <p>
            Shipping address: {order.address.line1}
            {order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city},{" "}
            {order.address.state} {order.address.postalCode}
          </p>
          <p>
            Paid with {order.cardBrand} ending in {order.cardLast4}
          </p>
        </div>
      </div>
    </div>
  );
}
