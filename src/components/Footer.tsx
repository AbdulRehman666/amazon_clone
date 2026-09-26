import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 text-sm sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-xl">Marlo</p>
          <p className="mt-2 text-muted">
            A demo storefront concept — original design, real backend, built to show how
            I think about product.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-ink">Shop</h3>
          <ul className="space-y-2 text-muted">
            <li>
              <Link href="/s" className="hover:text-ink">
                All products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-ink">
                Your bag
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-ink">Account</h3>
          <ul className="space-y-2 text-muted">
            <li>
              <Link href="/account/orders" className="hover:text-ink">
                Order history
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-ink">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-medium text-ink">About</h3>
          <ul className="space-y-2 text-muted">
            <li>Demo project</li>
            <li>Not a real store</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        Built as a take-home project. Not affiliated with any retailer.
      </div>
    </footer>
  );
}
