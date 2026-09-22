"use client";

import { useActionState } from "react";
import { placeOrderAction } from "@/app/actions/checkout";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrderAction, undefined);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <p className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-md bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-bold">1. Shipping address</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Full name</label>
            <input name="fullName" required className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Address line 1</label>
            <input name="line1" required className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Address line 2 (optional)</label>
            <input name="line2" className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input name="city" required className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State / Province</label>
            <input name="state" required className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Postal code</label>
            <input name="postalCode" required className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input name="phone" required className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
        </div>
      </section>

      <section className="rounded-md bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-bold">2. Payment method</h2>
        <p className="mb-3 text-xs text-gray-600">
          This is a demo store — no real payment is processed. Use any test numbers.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Name on card</label>
            <input name="cardName" required className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Card number</label>
            <input
              name="cardNumber"
              required
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              className="w-full rounded border border-gray-400 px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Expiry (MM/YY)</label>
            <input name="expiry" required placeholder="12/28" className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">CVC</label>
            <input name="cvc" required inputMode="numeric" className="w-full rounded border border-gray-400 px-3 py-2" />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-4 py-3 text-sm font-medium hover:bg-accent-dark disabled:opacity-50"
      >
        {pending ? "Placing order..." : "Place your order"}
      </button>
    </form>
  );
}
