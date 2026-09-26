import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 text-sm sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-xl italic">Marlo</p>
          <p className="mt-2 text-white/50">
            A demo storefront concept — original design, real backend, built to show how
            I think about product.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-paper">Shop</h3>
          <ul className="space-y-2 text-white/50">
            <li>
              <Link href="/s" className="hover:text-brand">
                All products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-brand">
                Your bag
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-paper">Account</h3>
          <ul className="space-y-2 text-white/50">
            <li>
              <Link href="/account/orders" className="hover:text-brand">
                Order history
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-brand">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-paper">About</h3>
          <ul className="space-y-2 text-white/50">
            <li>Demo project</li>
            <li>Not a real store</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        Built as a take-home project. Not affiliated with any retailer.
      </div>
    </footer>
  );
}
