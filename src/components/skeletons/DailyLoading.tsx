export const DailyLoading = () => {
  return (
    <div className="bg-surface border-border rounded-xl border p-4">
      <div className="flex animate-pulse flex-col items-center justify-center gap-4">
        <div className="bg-surface-elevated width-10 h-6 rounded-full"></div>
        <div className="bg-surface-elevated h-10 w-10 rounded-full"></div>
        <div className="flex gap-4">
          <div className="bg-surface-elevated size-8 h-6 rounded-full"></div>
          <div className="bg-surface-elevated size-8 h-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
