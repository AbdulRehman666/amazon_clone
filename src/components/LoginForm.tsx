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
          className="w-full rounded border border-gray-400 px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded border border-gray-400 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-4 py-2 text-sm font-medium hover:bg-accent-dark disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-xs text-gray-600">
        By continuing, you agree to amazan&apos;s fictional Conditions of Use.
      </p>
      <hr className="border-gray-200" />
      <p className="text-sm">
        New to amazan?{" "}
        <Link href={`/signup?redirect=${encodeURIComponent(redirectTo)}`} className="text-link hover:underline">
          Create your amazan account
        </Link>
      </p>
    </form>
  );
}
