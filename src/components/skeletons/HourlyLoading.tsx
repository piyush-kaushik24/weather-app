export const HourlyLoading = () => {
  return (
    <div className="bg-surface-elevated border-border rounded-xl border p-4">
      <div className="animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-8 bg-surface rounded-full"></div>

          <p className="bg-surface h-6 w-20 rounded-full"></p>
        </div>
        <p className="bg-surface h-6 w-10 rounded-full"></p>
      </div>
    </div>
  );
};
