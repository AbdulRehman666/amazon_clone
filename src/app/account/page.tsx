import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/account");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-medium">Your Account</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-white p-5 shadow-sm">
          <h2 className="mb-1 font-bold">Login &amp; security</h2>
          <p className="text-sm text-gray-700">{user.name}</p>
          <p className="text-sm text-gray-700">{user.email}</p>
        </div>
        <Link href="/account/orders" className="rounded-md bg-white p-5 shadow-sm hover:shadow-md">
          <h2 className="mb-1 font-bold">Your Orders</h2>
          <p className="text-sm text-gray-700">Track, return, or buy things again</p>
        </Link>
      </div>
      <form action={logoutAction} className="mt-6">
        <button type="submit" className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
          Sign out
        </button>
      </form>
    </div>
  );
}
