type SkeletonProps = {
  columnCount?: number;
  rowCount?: number;
};

export default function TableSkeleton({
  columnCount = 6,
  rowCount = 5,
}: SkeletonProps) {
  return (
    <div className="rounded-2xl border overflow-hidden border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black animate-pulse">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-5 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-40 rounded bg-zinc-100 dark:bg-zinc-900" />
        </div>
        <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="p-6 space-y-5">
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 items-center"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columnCount }).map((_, colIndex) => {
              if (colIndex === columnCount - 1) {
                return (
                  <div
                    key={colIndex}
                    className="h-8 rounded-xl bg-zinc-200 dark:bg-zinc-800 justify-self-end w-24"
                  />
                );
              }
              return (
                <div
                  key={colIndex}
                  className={`h-4 rounded ${
                    colIndex % 2 === 0
                      ? "bg-zinc-200 dark:bg-zinc-800"
                      : "bg-zinc-100 dark:bg-zinc-900"
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex gap-2">
          <div className="h-10 w-16 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 w-16 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
