import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/orderStatus";

const COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  in_progress: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

export default function OrderStatusBadge({ status }: { status: string }) {
  const key = (status in ORDER_STATUS_LABELS ? status : "pending") as OrderStatus;
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${COLORS[key]}`}>
      {ORDER_STATUS_LABELS[key]}
    </span>
  );
}
