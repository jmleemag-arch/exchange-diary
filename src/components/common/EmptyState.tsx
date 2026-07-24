type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex min-h-[108px] items-center justify-center rounded-[14px] border border-dashed border-border bg-surface-soft px-4 py-6 text-center text-sm text-text-muted">
      {message}
    </div>
  );
}
