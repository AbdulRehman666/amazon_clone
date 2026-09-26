import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { formatCents } from "@/lib/money";
import OrderStatusBadge from "@/components/OrderStatusBadge";

export default async function OrdersPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login?redirect=/account/orders");

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-3xl">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-line p-10 text-center ">
          <p className="mb-3 text-muted">You haven&apos;t placed any orders yet.</p>
          <Link href="/" className="text-brand hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-2xl border border-line p-5 ">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 text-sm text-muted">
                <span>Order placed: {order.createdAt.toLocaleDateString()}</span>
                <OrderStatusBadge status={order.status} />
                <span>Total: {formatCents(order.totalCents)}</span>
                <Link href={`/account/orders/${order.id}`} className="text-brand hover:underline">
                  View order details
                </Link>
              </div>
              <div className="flex gap-2">
                {order.items.slice(0, 5).map((item) => (
                  <div key={item.id} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-line/40">
                    <Image src={item.imageUrl} alt={item.title} fill sizes="64px" className="object-cover" />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
