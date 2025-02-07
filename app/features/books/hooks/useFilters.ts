import { useEffect, useState } from "react";
import { getBooks } from "~/services/apiBooks";
import { formatCharacteristic } from "~/utils/helpers";

type FilterOption = {
  label: string;
  value: string;
};

export function useFilters() {
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

  return { authorOptions, genreOptions, loaded };
}
