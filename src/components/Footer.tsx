import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-navy-light text-white">
      <button
        className="w-full bg-[#37475a] py-3 text-center text-sm hover:bg-[#485769]"
        type="button"
      >
        Back to top
      </button>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 text-sm sm:grid-cols-4">
        <div>
          <h3 className="mb-3 font-bold">Get to Know Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li>About amazan</li>
            <li>Careers</li>
            <li>Press Releases</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Make Money with Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Sell on amazan</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Payment Products</h3>
          <ul className="space-y-2 text-gray-300">
            <li>amazan Store Card</li>
            <li>Shop with Points</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Let Us Help You</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/account/orders" className="hover:underline">
                Your Orders
              </Link>
            </li>
            <li>Shipping Rates &amp; Policies</li>
            <li>Returns &amp; Replacements</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-400">
        This is a demo project built for a take-home assignment. Not affiliated with Amazon.com, Inc.
      </div>
    </footer>
  );
}
