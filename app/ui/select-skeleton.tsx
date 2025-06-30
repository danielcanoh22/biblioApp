export const SelectSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  );
};
