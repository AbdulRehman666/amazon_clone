import { prisma } from "@/lib/prisma";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/orderStatus";
import OrderCard from "@/components/admin/OrderCard";

const COLUMN_ACCENT: Record<OrderStatus, string> = {
  pending: "from-amber-400 to-amber-500",
  in_progress: "from-blue-400 to-blue-500",
  shipped: "from-accent2 to-violet-500",
  completed: "from-success to-emerald-500",
};

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
        {columns.map((col, colIndex) => (
          <div
            key={col.status}
            style={{ animationDelay: `${colIndex * 80}ms` }}
            className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-line/20"
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${COLUMN_ACCENT[col.status]}`} />
            <div className="p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-medium">{ORDER_STATUS_LABELS[col.status]}</h2>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted shadow-sm">
                  {col.orders.length}
                </span>
              </div>
              <div className="space-y-3">
                {col.orders.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-line px-3 py-6 text-center text-xs text-muted">
                    No orders here.
                  </p>
                ) : (
                  col.orders.map((order) => <OrderCard key={order.id} order={order} />)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
