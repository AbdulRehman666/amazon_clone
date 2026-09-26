"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { isOrderStatus } from "@/lib/orderStatus";

export type AdminFormState = { error?: string; success?: boolean } | undefined;

export async function updateOrderStatusAction(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?redirect=/admin/orders");

  const orderId = String(formData.get("orderId"));
  const status = String(formData.get("status"));
  if (!isOrderStatus(status)) return;

  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath("/account/orders");
}

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createProductAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?redirect=/admin/products");

  const title = String(formData.get("title") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const priceCents = Math.round(Number(formData.get("price")) * 100);
  const listPriceRaw = String(formData.get("listPrice") ?? "").trim();
  const listPriceCents = listPriceRaw ? Math.round(Number(listPriceRaw) * 100) : null;
  const stock = Number(formData.get("stock") ?? 0);
  const images = parseLines(formData.get("images"));
  const bullets = parseLines(formData.get("bullets"));

  if (!title || !brand || !categoryId || !description || images.length === 0) {
    return { error: "Please fill in all required fields, including at least one image URL." };
  }
  if (!Number.isFinite(priceCents) || priceCents <= 0) {
    return { error: "Enter a valid price." };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    return { error: "A product with a similar title (and slug) already exists." };
  }

  const product = await prisma.product.create({
    data: {
      slug,
      title,
      brand,
      categoryId,
      description,
      priceCents,
      listPriceCents,
      stock: Number.isFinite(stock) ? stock : 0,
      images: JSON.stringify(images),
      bullets: JSON.stringify(bullets),
      rating: 4.5,
      reviewCount: 0,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/s");
  redirect(`/admin/products/${product.id}/edit`);
}

export async function updateProductAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?redirect=/admin/products");

  const productId = String(formData.get("productId"));
  const title = String(formData.get("title") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const priceCents = Math.round(Number(formData.get("price")) * 100);
  const listPriceRaw = String(formData.get("listPrice") ?? "").trim();
  const listPriceCents = listPriceRaw ? Math.round(Number(listPriceRaw) * 100) : null;
  const stock = Number(formData.get("stock") ?? 0);
  const images = parseLines(formData.get("images"));
  const bullets = parseLines(formData.get("bullets"));

  if (!title || !brand || !categoryId || !description || images.length === 0) {
    return { error: "Please fill in all required fields, including at least one image URL." };
  }
  if (!Number.isFinite(priceCents) || priceCents <= 0) {
    return { error: "Enter a valid price." };
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      title,
      brand,
      categoryId,
      description,
      priceCents,
      listPriceCents,
      stock: Number.isFinite(stock) ? stock : 0,
      images: JSON.stringify(images),
      bullets: JSON.stringify(bullets),
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/s");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProductAction(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?redirect=/admin/products");

  const productId = String(formData.get("productId"));
  await prisma.orderItem.deleteMany({ where: { productId } });
  await prisma.product.delete({ where: { id: productId } });

  revalidatePath("/admin/products");
  revalidatePath("/s");
}
