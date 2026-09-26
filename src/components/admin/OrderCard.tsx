import { formatCents } from "@/lib/money";
import { nextOrderStatus, previousOrderStatus, ORDER_STATUS_LABELS } from "@/lib/orderStatus";
import { updateOrderStatusAction } from "@/app/actions/admin";
import type { Order, OrderItem, User } from "@prisma/client";

type OrderWithRelations = Order & { items: OrderItem[]; user: User };

export default function OrderCard({ order }: { order: OrderWithRelations }) {
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const prev = previousOrderStatus(order.status);
  const next = nextOrderStatus(order.status);

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{order.user.name}</p>
          <p className="text-xs text-muted">{order.user.email}</p>
        </div>
        <p className="text-sm font-medium">{formatCents(order.totalCents)}</p>
      </div>
      <p className="text-xs text-muted">
        {itemCount} item{itemCount === 1 ? "" : "s"} · {order.createdAt.toLocaleDateString()}
      </p>
      <p className="mt-1 truncate text-[11px] text-muted">#{order.id}</p>

      <div className="mt-3 flex gap-2">
        {prev && (
          <form action={updateOrderStatusAction}>
            <input type="hidden" name="orderId" value={order.id} />
            <input type="hidden" name="status" value={prev} />
            <button
              type="submit"
              className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-ink"
            >
              ← {ORDER_STATUS_LABELS[prev]}
            </button>
          </form>
        )}
        {next && (
          <form action={updateOrderStatusAction}>
            <input type="hidden" name="orderId" value={order.id} />
            <input type="hidden" name="status" value={next} />
            <button
              type="submit"
              className="rounded-full bg-ink px-3 py-1.5 text-xs text-paper hover:bg-brand"
            >
              {ORDER_STATUS_LABELS[next]} →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
