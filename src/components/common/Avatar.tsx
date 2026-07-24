type AvatarTone = "coral" | "beige" | "neutral";

const toneClass: Record<AvatarTone, string> = {
  coral: "bg-accent-soft text-accent",
  beige: "bg-[#f0ebe6] text-text-secondary",
  neutral: "bg-surface-soft text-text-secondary",
};

type AvatarProps = {
  initials: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  tone?: AvatarTone;
};

const sizeClass = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({
  initials,
  alt,
  size = "md",
  tone = "neutral",
}: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={alt}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClass[size]} ${toneClass[tone]}`}
    >
      {initials.slice(0, 1)}
    </span>
  );
}
