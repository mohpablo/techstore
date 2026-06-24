type InputFieldSkeletonProps = {
  hasLabel?: boolean;
};

const InputFieldSkeleton = ({ hasLabel = true }: InputFieldSkeletonProps) => {
  return (
    <div className="relative w-full animate-pulse">
      {hasLabel && (
        <div className="h-[11px] w-16 bg-zinc-200 dark:bg-zinc-800 rounded mb-1.5 ml-1" />
      )}
      <div
        className="w-full h-[42px] rounded-xl border border-zinc-100 bg-zinc-50/50 
          dark:border-zinc-800/80 dark:bg-zinc-900/50 flex items-center pl-3.5"
      >
        <div className="h-[18px] w-[18px] rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

InputFieldSkeleton.displayName = "InputFieldSkeleton";

export default InputFieldSkeleton;
