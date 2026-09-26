import { prisma } from "@/lib/prisma";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/lib/orderStatus";
import OrderCard from "@/components/admin/OrderCard";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  const columns = ORDER_STATUSES.map((status) => ({
    status,
    orders: orders.filter((o) => o.status === status),
  }));

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.status} className="rounded-2xl bg-line/30 p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-sm font-medium">{ORDER_STATUS_LABELS[col.status]}</h2>
              <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted">
                {col.orders.length}
              </span>
            </div>
            <div className="space-y-3">
              {col.orders.length === 0 ? (
                <p className="px-1 text-xs text-muted">No orders here.</p>
              ) : (
                col.orders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
