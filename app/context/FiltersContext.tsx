import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getBooks } from "~/services/apiBooks";
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

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [authorOptions, setAuthorOptions] = useState<FilterOption[]>([]);
  const [genreOptions, setGenreOptions] = useState<FilterOption[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchUniqueOptions() {
      const allBooks = await getBooks({ author: "", genre: "" });

      const uniqueAuthors = Array.from(
        new Set(allBooks.map((book) => book.author))
      ).map((author) => ({
        label: author,
        value: formatCharacteristic(author),
      }));

      const uniqueGenres = Array.from(
        new Set(allBooks.map((book) => book.genre))
      ).map((genre) => ({
        label: genre,
        value: formatCharacteristic(genre),
      }));

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
