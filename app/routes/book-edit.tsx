import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/book-edit";
import type { Book } from "~/types/types";
import { bookLoader } from "~/utils/loaders";
import { BookForm } from "~/features/books-management/book-form";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { ButtonBack } from "~/ui/button-back";
import { updateBook } from "~/services/apiBooks";
import toast from "react-hot-toast";

export const clientLoader = bookLoader;

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const { bookId } = params;

  const formData = await request.formData();
  const updatedData = {
    id: Number(bookId),
    title: String(formData.get("title")),
    author: String(formData.get("author")),
    genre: String(formData.get("genre")),
    available_copies: Number(formData.get("copies")),
    description: String(formData.get("description")),
    image: String(formData.get("image")),
  };

  const result = await updateBook(params.bookId, updatedData);

  if (!result?.succeeded) {
    toast.error(result.message);
    return null;
  }

  toast.success("Libro actualizado correctamente 😄");

  return redirect("/admin/libros");
}

export default function BookEdit({ loaderData, params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const result = loaderData;

  const book: Book | null = "data" in result ? result.data : null;

  console.log(book);

  const bookToEdit = {
    id: book?.id || 0,
    title: book?.title || "",
    genre: book?.genre || "",
    author: book?.author || "",
    description: book?.description || "",
    available_copies: book?.available_copies || 0,
    image: book?.image || "",
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  return (
    <Container>
      <PrimaryTitle text="Editar libro" />

      {book ? (
        <BookForm
          book={bookToEdit}
          action={`/admin/libros/${book?.id}/editar`}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <ButtonBack />

          <Message
            variant="info"
            text={`No se encontró ningún libro con el ID ${params.bookId}`}
          />
        </div>
      )}
    </Container>
  );
}
