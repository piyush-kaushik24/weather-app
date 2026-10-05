export const AsideLoading = () => {
  return (
    <div className="e bg-surface border-border rounded-xl border p-4">
      <div className="flex animate-pulse flex-col gap-4">
        <div className="bg-surface-elevated h-6 rounded-full"></div>
        <div className="bg-surface-elevated h-8 rounded-full"></div>
      </div>
    </div>
  );
};
