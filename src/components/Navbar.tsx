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
    <header className="sticky top-0 z-50 bg-ink text-paper shadow-lg shadow-ink/20">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-display text-2xl italic tracking-tight text-paper transition-colors hover:text-brand"
        >
          Marlo
        </Link>

        <SearchBar categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />

        <nav className="flex shrink-0 items-center gap-4 text-sm">
          <Link
            href={user ? "/account" : "/login"}
            className="hidden flex-col leading-tight text-paper hover:text-brand sm:flex"
          >
            <span className="text-[11px] text-white/50">
              {user ? `Hi, ${user.name.split(" ")[0]}` : "Welcome"}
            </span>
            <span className="font-medium">Account</span>
          </Link>

          <Link
            href="/account/orders"
            className="hidden flex-col leading-tight text-paper hover:text-brand md:flex"
          >
            <span className="text-[11px] text-white/50">Track</span>
            <span className="font-medium">Orders</span>
          </Link>

          {user?.role === "admin" && (
            <Link
              href="/admin/orders"
              className="hidden rounded-full bg-gradient-to-r from-brand to-accent2 px-3 py-1.5 text-xs font-medium text-white shadow sm:inline"
            >
              Admin
            </Link>
          )}

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-md"
          >
            <CartIcon count={cartCount} />
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2.5 text-sm sm:px-6">
          <Link
            href="/s"
            className="shrink-0 rounded-full px-3 py-1 text-white/60 transition-colors hover:bg-white/10 hover:text-paper"
          >
            Everything
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/s?category=${c.slug}`}
              className="shrink-0 rounded-full px-3 py-1 text-white/60 transition-colors hover:bg-brand/20 hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
