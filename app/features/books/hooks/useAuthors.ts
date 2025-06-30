import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "~/services/apiAuthors";

const authorsQueryKey = ["authors"];

export const useAuthors = () => {
  const {
    data: authors,
    isPending,
    isError,
  } = useQuery({
    queryKey: authorsQueryKey,
    queryFn: getAuthors,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return { authors, isPending, isError };
};
