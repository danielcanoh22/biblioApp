import { SelectSkeleton } from "~/ui/select-skeleton";
import { BooksFilterSelect } from "./books-filter-select";
import { useAuthors } from "./hooks/useAuthors";
import { useGenres } from "./hooks/useGenres";

export const BooksFilter = () => {
  const {
    authors,
    isPending: isPendingAuthors,
    isError: isErrorAuthors,
  } = useAuthors();
  const {
    genres,
    isPending: isPendingGenres,
    isError: isErrorGenres,
  } = useGenres();

  return (
    <div className="my-6 flex flex-col gap-2 dark:text-gray-300 w-max">
      <span className="text-gray-600 dark:text-gray-300 font-semibold">
        Filtrar
      </span>

      <div className="flex flex-col gap-4 w-max text-sm sm:flex-row">
        <div className="flex items-center gap-2 w-max">
          <span>Autor:</span>
          {isPendingAuthors ? (
            <SelectSkeleton />
          ) : isErrorAuthors || !authors?.succeeded ? (
            <span className="text-red-500 text-xs">Error al cargar</span>
          ) : (
            <BooksFilterSelect options={authors.data} paramName="author" />
          )}
        </div>

        <div className="flex items-center gap-2 w-max">
          <span>Género:</span>
          {isPendingGenres ? (
            <SelectSkeleton />
          ) : isErrorGenres || !genres?.succeeded ? (
            <span className="text-red-500 text-xs">Error al cargar</span>
          ) : (
            <BooksFilterSelect options={genres.data} paramName="genre" />
          )}
        </div>
      </div>
    </div>
  );
};
