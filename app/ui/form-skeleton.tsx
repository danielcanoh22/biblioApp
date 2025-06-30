const SkeletonRow = () => (
  <div className="flex flex-col gap-2">
    <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
    <div className="h-9 w-full rounded bg-gray-200 dark:bg-gray-700" />
  </div>
);

export const FormSkeleton = () => {
  return (
    <div
      aria-label="Cargando formulario"
      role="status"
      className="mt-4 flex flex-col gap-6 sm:w-96 animate-pulse"
    >
      <div className="flex flex-col gap-3">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />

        <div className="flex flex-col gap-2">
          <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-24 w-full rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4">
        <div className="h-10 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-10 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};
