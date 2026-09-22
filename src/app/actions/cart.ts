"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as cart from "@/lib/cart";

export async function addToCartAction(formData: FormData) {
  const productId = String(formData.get("productId"));
  const quantity = Number(formData.get("quantity") ?? 1);
  await cart.addToCart(productId, quantity);
  revalidatePath("/", "layout");
}

export async function buyNowAction(formData: FormData) {
  const productId = String(formData.get("productId"));
  const quantity = Number(formData.get("quantity") ?? 1);
  await cart.addToCart(productId, quantity);
  revalidatePath("/", "layout");
  redirect("/checkout");
}

export async function updateCartQuantityAction(formData: FormData) {
  const productId = String(formData.get("productId"));
  const quantity = Number(formData.get("quantity"));
  await cart.updateCartQuantity(productId, quantity);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeFromCartAction(formData: FormData) {
  const productId = String(formData.get("productId"));
  await cart.removeFromCart(productId);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}
