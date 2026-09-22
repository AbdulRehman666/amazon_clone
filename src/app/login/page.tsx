import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const redirectTo = typeof sp.redirect === "string" ? sp.redirect : "/account";

  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <Link href="/" className="mb-6 block text-center text-2xl font-bold text-navy">
        amaz<span className="text-accent-dark">an</span>
      </Link>
      <div className="rounded border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-medium">Sign in</h1>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
