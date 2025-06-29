import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getAuthors } from "~/services/apiAuthors";
import { getGenres } from "~/services/apiGenres";
import type { Author } from "~/types/authors";
import type { Genre } from "~/types/genres";
import { formatCharacteristic } from "~/utils/helpers";

type FilterOption = {
  label: string;
  value: string | number;
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

const getSelectOptions = (data: Author[] | Genre[]) => {
  return data.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [authorOptions, setAuthorOptions] = useState<FilterOption[]>([]);
  const [genreOptions, setGenreOptions] = useState<FilterOption[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchFilters() {
      const authorsResult = await getAuthors();
      const genresResult = await getGenres();

      if (!authorsResult.succeeded) return;

      const allAuthors = "data" in authorsResult ? authorsResult.data : [];
      const allGenres = "data" in genresResult ? genresResult.data : [];

      const authorsSelectOptions = getSelectOptions(allAuthors);
      const genresSelectOptions = getSelectOptions(allGenres);

      setAuthorOptions([
        { label: "Seleccionar un autor", value: "" },
        ...authorsSelectOptions,
      ]);
      setGenreOptions([
        { label: "Seleccionar un género", value: "" },
        ...genresSelectOptions,
      ]);

      setLoaded(true);
    }

    if (!loaded) {
      fetchFilters();
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
