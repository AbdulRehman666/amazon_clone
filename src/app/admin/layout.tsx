import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/login?redirect=/admin/orders");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">Admin</p>
          <h1 className="font-display text-3xl">Store management</h1>
        </div>
        <nav className="flex gap-2">
          <Link
            href="/admin/orders"
            className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink"
          >
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink"
          >
            Products
          </Link>
          <Link href="/" className="rounded-full px-4 py-2 text-sm text-muted hover:text-ink">
            Exit admin
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
