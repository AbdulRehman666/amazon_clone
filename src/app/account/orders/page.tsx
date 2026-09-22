import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { formatCents } from "@/lib/money";

export default async function OrdersPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login?redirect=/account/orders");

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-medium">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="rounded-md bg-white p-8 text-center shadow-sm">
          <p className="mb-3 text-gray-700">You haven&apos;t placed any orders yet.</p>
          <Link href="/" className="text-link hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-md bg-white p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap justify-between gap-2 border-b border-gray-200 pb-3 text-sm text-gray-600">
                <span>Order placed: {order.createdAt.toLocaleDateString()}</span>
                <span>Total: {formatCents(order.totalCents)}</span>
                <Link href={`/account/orders/${order.id}`} className="text-link hover:underline">
                  View order details
                </Link>
              </div>
              <div className="flex gap-2">
                {order.items.slice(0, 5).map((item) => (
                  <div key={item.id} className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-gray-50">
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
