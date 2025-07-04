import toast from "react-hot-toast";
import type { ClientLoaderFunctionArgs } from "react-router";
import { getBookById, getBooks } from "~/services/apiBooks";
import { getBooksQuerySchema } from "~/schemas/book";

export async function allBooksLoader(args: ClientLoaderFunctionArgs) {
  const url = new URL(args.request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  const validationResult = getBooksQuerySchema.safeParse(queryParams);

  if (!validationResult.success) {
    toast.error("El parámetro de búsqueda ingresado no es válido");
    return null;
  }

  const validatedParams = validationResult.data;

  const data = await getBooks(validatedParams);

  return data;
}

export async function bookLoader(args: ClientLoaderFunctionArgs) {
  const result = await getBookById(args.params?.bookId || "");

  if (!result.succeeded) {
    return null;
  }

  return result;
}
