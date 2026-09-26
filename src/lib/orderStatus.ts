export const ORDER_STATUSES = ["pending", "in_progress", "shipped", "completed"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  shipped: "Shipped",
  completed: "Completed",
};

export function isOrderStatus(value: string): value is OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(value);
}

export function nextOrderStatus(status: string): OrderStatus | null {
  const idx = ORDER_STATUSES.indexOf(status as OrderStatus);
  if (idx === -1 || idx === ORDER_STATUSES.length - 1) return null;
  return ORDER_STATUSES[idx + 1];
}

export function previousOrderStatus(status: string): OrderStatus | null {
  const idx = ORDER_STATUSES.indexOf(status as OrderStatus);
  if (idx <= 0) return null;
  return ORDER_STATUSES[idx - 1];
}
