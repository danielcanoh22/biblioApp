import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getBooks } from "~/services/apiBooks";
import type { Book } from "~/types/types";
import { formatCharacteristic } from "~/utils/helpers";

type FilterOption = {
  label: string;
  value: string;
};

type FiltersContextType = {
  authorOptions: FilterOption[];
  genreOptions: FilterOption[];
  loaded: boolean;
};

type FiltersProviderProps = {
  children: ReactNode;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const getUniqueValues = <T extends keyof Book>(books: Book[], field: T) => {
  return Array.from(new Set(books.map((book: Book) => book[field]))).map(
    (value) => ({
      label: value,
      value: formatCharacteristic(String(value)),
    })
  );
};

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [authorOptions, setAuthorOptions] = useState<FilterOption[]>([]);
  const [genreOptions, setGenreOptions] = useState<FilterOption[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchUniqueOptions() {
      const result = await getBooks({ author: "", genre: "" });

      // if (!result?.success) return;

      const allBooks = result;

      const uniqueAuthors = getUniqueValues(allBooks, "author");
      const uniqueGenres = getUniqueValues(allBooks, "nameGenre");

      setAuthorOptions([
        { label: "Seleccionar un autor", value: "" },
        ...uniqueAuthors,
      ]);
      setGenreOptions([
        { label: "Seleccionar un género", value: "" },
        ...uniqueGenres,
      ]);
      setLoaded(true);
    }

    if (!loaded) {
      fetchUniqueOptions();
    }
  }, [loaded]);

  return (
    <FiltersContext.Provider value={{ authorOptions, genreOptions, loaded }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("useFilters debe usarse dentro de FiltersProvider");

  return context;
}
