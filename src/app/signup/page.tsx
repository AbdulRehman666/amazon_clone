import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const sp = await searchParams;
  const redirectTo = typeof sp.redirect === "string" && sp.redirect ? sp.redirect : "/account";

  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <Link href="/" className="mb-6 block text-center font-display text-3xl">
        Marlo
      </Link>
      <div className="rounded-2xl border border-line bg-surface p-6">
        <h1 className="mb-4 text-2xl font-medium">Create account</h1>
        <SignupForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
