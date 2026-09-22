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
    <header className="sticky top-0 z-50">
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-4">
          <Link href="/" className="shrink-0 rounded-sm border border-transparent px-2 py-1 text-xl font-bold hover:border-white">
            amaz<span className="text-accent">an</span>
          </Link>

          <Link
            href="/account/orders"
            className="hidden shrink-0 flex-col rounded-sm border border-transparent px-2 py-1 text-xs leading-tight hover:border-white sm:flex"
          >
            <span className="text-gray-300">Deliver to</span>
            <span className="font-bold">Your Address</span>
          </Link>

          <SearchBar categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />

          <Link
            href={user ? "/account" : "/login"}
            className="hidden shrink-0 flex-col rounded-sm border border-transparent px-2 py-1 text-xs leading-tight hover:border-white md:flex"
          >
            <span className="text-gray-300">
              Hello, {user ? user.name.split(" ")[0] : "sign in"}
            </span>
            <span className="font-bold">Account &amp; Lists</span>
          </Link>

          <Link
            href="/account/orders"
            className="hidden shrink-0 flex-col rounded-sm border border-transparent px-2 py-1 text-xs leading-tight hover:border-white lg:flex"
          >
            <span className="text-gray-300">Returns</span>
            <span className="font-bold">&amp; Orders</span>
          </Link>

          <Link
            href="/cart"
            className="flex shrink-0 items-end gap-1 rounded-sm border border-transparent px-2 py-1 hover:border-white"
          >
            <CartIcon count={cartCount} />
            <span className="hidden text-sm font-bold sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      <div className="hidden bg-navy-light text-sm text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-1.5">
          <span className="shrink-0 font-semibold">All Categories:</span>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/s?category=${c.slug}`}
              className="shrink-0 rounded-sm border border-transparent px-1 py-0.5 hover:border-white"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
