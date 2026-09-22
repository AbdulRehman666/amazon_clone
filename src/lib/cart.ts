import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const CART_COOKIE = "cart";

export type CartLine = { productId: string; quantity: number };

async function readCartCookie(): Promise<CartLine[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        typeof l?.productId === "string" && typeof l?.quantity === "number" && l.quantity > 0
    );
  } catch {
    return [];
  }
}

async function writeCartCookie(lines: CartLine[]) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, JSON.stringify(lines), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
}

export async function getCart(): Promise<CartLine[]> {
  return readCartCookie();
}

export async function addToCart(productId: string, quantity: number) {
  const lines = await readCartCookie();
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({ productId, quantity });
  }
  await writeCartCookie(lines);
}

export async function updateCartQuantity(productId: string, quantity: number) {
  let lines = await readCartCookie();
  if (quantity <= 0) {
    lines = lines.filter((l) => l.productId !== productId);
  } else {
    const existing = lines.find((l) => l.productId === productId);
    if (existing) existing.quantity = quantity;
  }
  await writeCartCookie(lines);
}

export async function removeFromCart(productId: string) {
  const lines = (await readCartCookie()).filter((l) => l.productId !== productId);
  await writeCartCookie(lines);
}

export async function clearCart() {
  await writeCartCookie([]);
}

export async function getCartCount(): Promise<number> {
  const lines = await readCartCookie();
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export async function getHydratedCart() {
  const lines = await readCartCookie();
  if (lines.length === 0) return [];
  const products = await prisma.product.findMany({
    where: { id: { in: lines.map((l) => l.productId) } },
  });
  return lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      return { product, quantity: line.quantity };
    })
    .filter((x): x is { product: (typeof products)[number]; quantity: number } => x !== null);
}
