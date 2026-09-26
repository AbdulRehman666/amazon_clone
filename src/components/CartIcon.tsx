export default function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative inline-flex items-center gap-1.5 text-sm font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M3 4h2l1.2 12.2A2 2 0 0 0 8.2 18H18a2 2 0 0 0 1.95-1.55L21.5 8H6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="21" r="1.4" fill="currentColor" />
        <circle cx="17" cy="21" r="1.4" fill="currentColor" />
      </svg>
      Bag
      {count > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </span>
  );
}
