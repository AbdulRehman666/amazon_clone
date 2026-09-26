import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getCartCount } from "@/lib/cart";
import CartIcon from "@/components/CartIcon";
import SearchBar from "@/components/SearchBar";

export default async function Navbar() {
  const [categories, user, cartCount] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    getCurrentUser(),
    getCartCount(),
  ]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6">
        <Link href="/" className="shrink-0 font-display text-2xl tracking-tight text-ink">
          Marlo
        </Link>

        <SearchBar categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />

        <nav className="flex shrink-0 items-center gap-4 text-sm">
          <Link
            href={user ? "/account" : "/login"}
            className="hidden flex-col leading-tight text-ink hover:text-brand sm:flex"
          >
            <span className="text-[11px] text-muted">
              {user ? `Hi, ${user.name.split(" ")[0]}` : "Welcome"}
            </span>
            <span className="font-medium">Account</span>
          </Link>

          <Link
            href="/account/orders"
            className="hidden flex-col leading-tight text-ink hover:text-brand md:flex"
          >
            <span className="text-[11px] text-muted">Track</span>
            <span className="font-medium">Orders</span>
          </Link>

          {user?.role === "admin" && (
            <Link
              href="/admin/orders"
              className="hidden rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-paper hover:bg-brand sm:inline"
            >
              Admin
            </Link>
          )}

          <Link href="/cart" className="flex items-center gap-2 rounded-full border border-line px-3 py-2 hover:border-brand hover:text-brand">
            <CartIcon count={cartCount} />
          </Link>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2.5 text-sm sm:px-6">
          <Link
            href="/s"
            className="shrink-0 rounded-full px-3 py-1 text-muted hover:bg-ink/5 hover:text-ink"
          >
            Everything
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/s?category=${c.slug}`}
              className="shrink-0 rounded-full px-3 py-1 text-muted hover:bg-ink/5 hover:text-ink"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
