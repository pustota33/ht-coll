import React from "react";

function reviewCountFromSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const count = 30 + (Math.abs(hash) % 70); // 30..99
  return count;
}

export default function Rating({ seed, className }: { seed: string; className?: string }) {
  const count = reviewCountFromSeed(seed);
  return (
    <span className={className || "text-xs text-muted-foreground"} aria-label={`${count} reviews`}>
      ⭐⭐⭐⭐⭐ {count} reviews
    </span>
  );
}
