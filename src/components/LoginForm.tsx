"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      {state?.error && (
        <p className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-4 py-3 text-sm font-medium text-paper hover:bg-brand disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-xs text-muted">
        By continuing, you agree to Marlo&apos;s fictional Conditions of Use.
      </p>
      <hr className="border-line" />
      <p className="text-sm">
        New to Marlo?{" "}
        <Link href={`/signup?redirect=${encodeURIComponent(redirectTo)}`} className="text-brand hover:underline">
          Create your Marlo account
        </Link>
      </p>
    </form>
  );
}
