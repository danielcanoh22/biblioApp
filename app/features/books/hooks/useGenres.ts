import { useQuery } from "@tanstack/react-query";
import { getGenres } from "~/services/apiGenres";

const genresQueryKey = ["genres"];

export const useGenres = () => {
  const {
    data: genres,
    isPending,
    isError,
  } = useQuery({
    queryKey: genresQueryKey,
    queryFn: getGenres,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { genres, isPending, isError };
};
