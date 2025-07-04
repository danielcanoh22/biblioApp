import toast from "react-hot-toast";
import { redirect } from "react-router";
import { deleteBook } from "~/services/apiBooks";
import type { Route } from "./+types/book-delete";

export async function clientAction({ params }: Route.ClientActionArgs) {
  const result = await deleteBook(params.bookId);

  if (!result?.succeeded) {
    toast.error(result.message);
    redirect("/admin/libros");
    return null;
  }

  toast.success("Libro eliminado correctamente 😄");

  return redirect("/admin/libros");
}

export default function BookDelete() {
  return null;
}
