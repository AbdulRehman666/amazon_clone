"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { getHydratedCart, clearCart } from "@/lib/cart";

export type CheckoutState = { error?: string } | undefined;

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 3500; // cents
const FLAT_SHIPPING = 599; // cents

function guessCardBrand(cardNumber: string) {
  if (cardNumber.startsWith("4")) return "Visa";
  if (cardNumber.startsWith("5")) return "Mastercard";
  if (cardNumber.startsWith("3")) return "Amex";
  return "Card";
}

export async function placeOrderAction(
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const userId = await getSessionUserId();
  if (!userId) {
    redirect("/login?redirect=/checkout");
  }

  const lines = await getHydratedCart();
  if (lines.length === 0) {
    return { error: "Your cart is empty." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const line1 = String(formData.get("line1") ?? "").trim();
  const line2 = String(formData.get("line2") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const postalCode = String(formData.get("postalCode") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  const cardName = String(formData.get("cardName") ?? "").trim();
  const cardNumberRaw = String(formData.get("cardNumber") ?? "").replace(/\s+/g, "");
  const expiry = String(formData.get("expiry") ?? "").trim();
  const cvc = String(formData.get("cvc") ?? "").trim();

  if (!fullName || !line1 || !city || !state || !postalCode || !phone) {
    return { error: "Please fill in all shipping address fields." };
  }
  if (!cardName || cardNumberRaw.length < 12 || !/^\d+$/.test(cardNumberRaw) || !expiry || !cvc) {
    return { error: "Please enter a valid payment card." };
  }

  const address = await prisma.address.create({
    data: {
      userId,
      fullName,
      line1,
      line2: line2 || null,
      city,
      state,
      postalCode,
      phone,
    },
  });

  const subtotalCents = lines.reduce((sum, l) => sum + l.product.priceCents * l.quantity, 0);
  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + shippingCents + taxCents;

  const order = await prisma.order.create({
    data: {
      userId,
      addressId: address.id,
      subtotalCents,
      shippingCents,
      taxCents,
      totalCents,
      cardBrand: guessCardBrand(cardNumberRaw),
      cardLast4: cardNumberRaw.slice(-4),
      items: {
        create: lines.map((l) => ({
          productId: l.product.id,
          title: l.product.title,
          priceCents: l.product.priceCents,
          quantity: l.quantity,
          imageUrl: (JSON.parse(l.product.images) as string[])[0],
        })),
      },
    },
  });

  await clearCart();
  redirect(`/checkout/confirmation/${order.id}`);
}
