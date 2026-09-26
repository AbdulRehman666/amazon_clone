import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/account");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-3xl">Your account</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-6">
          <h2 className="mb-1 font-medium">Login &amp; security</h2>
          <p className="text-sm text-muted">{user.name}</p>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
        <Link href="/account/orders" className="rounded-2xl border border-line p-6 hover:border-ink">
          <h2 className="mb-1 font-medium">Your orders</h2>
          <p className="text-sm text-muted">Track, return, or buy things again</p>
        </Link>
      </div>
      <form action={logoutAction} className="mt-6">
        <button type="submit" className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink">
          Sign out
        </button>
      </form>
    </div>
  );
}
