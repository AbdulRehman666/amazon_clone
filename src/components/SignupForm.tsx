"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction } from "@/app/actions/auth";

export default function SignupForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(signupAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      {state?.error && (
        <p className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium">Your name</label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
      </div>
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
          minLength={8}
          className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
        <p className="mt-1 text-xs text-muted">At least 8 characters.</p>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-4 py-3 text-sm font-medium text-paper hover:bg-brand disabled:opacity-50"
      >
        {pending ? "Creating account..." : "Create your Marlo account"}
      </button>
      <hr className="border-line" />
      <p className="text-sm">
        Already have an account?{" "}
        <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
