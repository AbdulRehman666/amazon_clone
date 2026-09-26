"use client";

import { useTransition } from "react";
import { formatCents } from "@/lib/money";
import { nextOrderStatus, previousOrderStatus, ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/orderStatus";
import { updateOrderStatusAction } from "@/app/actions/admin";
import type { Order, OrderItem, User } from "@prisma/client";

type OrderWithRelations = Order & { items: OrderItem[]; user: User };

export default function OrderCard({ order }: { order: OrderWithRelations }) {
  const [isPending, startTransition] = useTransition();
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const prev = previousOrderStatus(order.status);
  const next = nextOrderStatus(order.status);

  function move(status: OrderStatus) {
    const fd = new FormData();
    fd.set("orderId", order.id);
    fd.set("status", status);
    startTransition(() => {
      updateOrderStatusAction(fd);
    });
  }

  return (
    <div
      className={`animate-fade-up rounded-2xl border border-line bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        isPending ? "scale-95 opacity-50" : ""
      }`}
    >
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
          <button
            type="button"
            disabled={isPending}
            onClick={() => move(prev)}
            className="rounded-full border border-line px-3 py-1.5 text-xs transition-all hover:scale-105 hover:border-ink active:scale-95 disabled:pointer-events-none"
          >
            ← {ORDER_STATUS_LABELS[prev]}
          </button>
        )}
        {next && (
          <button
            type="button"
            disabled={isPending}
            onClick={() => move(next)}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-brand-dark px-3 py-1.5 text-xs text-white shadow transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none"
          >
            {isPending && (
              <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            {ORDER_STATUS_LABELS[next]} →
          </button>
        )}
      </div>
    </div>
  );
}
