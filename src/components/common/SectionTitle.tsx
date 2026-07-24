type SectionTitleProps = {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function SectionTitle({
  children,
  action,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-4 flex items-center justify-between gap-3 ${className}`}>
      <h2 className="text-lg font-semibold tracking-tight text-text-primary">
        {children}
      </h2>
      {action}
    </div>
  );
}
