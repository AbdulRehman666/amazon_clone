"use client";

import { useActionState } from "react";
import { placeOrderAction } from "@/app/actions/checkout";

const inputClass =
  "w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-brand";
const labelClass = "mb-1 block text-sm text-muted";

function StepHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-medium text-paper">
        {step}
      </span>
      <h2 className="text-lg font-medium">{title}</h2>
    </div>
  );
}

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrderAction, undefined);

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <p className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-2xl border border-line p-6">
        <StepHeading step={1} title="Shipping address" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Full name</label>
            <input name="fullName" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address line 1</label>
            <input name="line1" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address line 2 (optional)</label>
            <input name="line2" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input name="city" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State / Province</label>
            <input name="state" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Postal code</label>
            <input name="postalCode" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" required className={inputClass} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-line p-6">
        <StepHeading step={2} title="Payment" />
        <p className="mb-4 text-xs text-muted">
          This is a demo store — no real payment is processed. Use any test numbers.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Name on card</label>
            <input name="cardName" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Card number</label>
            <input
              name="cardNumber"
              required
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Expiry (MM/YY)</label>
            <input name="expiry" required placeholder="12/28" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>CVC</label>
            <input name="cvc" required inputMode="numeric" className={inputClass} />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-4 py-3 text-sm font-medium text-paper hover:bg-brand disabled:opacity-50"
      >
        {pending ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}
