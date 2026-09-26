import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const redirectTo = typeof sp.redirect === "string" ? sp.redirect : "";

  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <Link href="/" className="mb-6 block text-center font-display text-3xl italic text-ink transition-colors hover:text-brand">
        Marlo
      </Link>
      <div className="rounded-2xl border border-line bg-surface p-6">
        <h1 className="mb-4 text-2xl font-medium">Sign in</h1>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
