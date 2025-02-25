import type { ClientLoaderFunctionArgs } from "react-router";
import { getBookById, getBooks } from "~/services/apiBooks";

export async function allBooksLoader(args: ClientLoaderFunctionArgs) {
  const url = new URL(args.request.url);
  const author = url.searchParams.get("autor") || "";
  const genre = url.searchParams.get("genero") || "";

  const result = await getBooks({ author, genre });

  return result;
}

export async function bookLoader(args: ClientLoaderFunctionArgs) {
  const result = await getBookById(args.params?.bookId || "");
  return result;
}
