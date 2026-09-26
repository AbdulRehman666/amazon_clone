import { useId } from "react";

function Star({ fill }: { fill: number }) {
  const id = `star-clip-${useId()}`;
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={20 * fill} height="20" />
        </clipPath>
      </defs>
      <path
        d="M10 1.5 12.6 7l6 .87-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.3-4.2 6-.87Z"
        fill="#ece1e4"
      />
      <path
        d="M10 1.5 12.6 7l6 .87-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.3-4.2 6-.87Z"
        fill="#ff6b4a"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}

export default function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "lg";
}) {
  const stars = [0, 1, 2, 3, 4].map((i) => Math.max(0, Math.min(1, rating - i)));
  return (
    <div className={`flex items-center gap-1 ${size === "lg" ? "scale-110" : ""}`}>
      <div className="flex">
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-muted">
          {reviewCount.toLocaleString()}
        </span>
      )}
    </div>
  );
}
