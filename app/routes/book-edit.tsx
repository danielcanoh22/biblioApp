import { useNavigate } from "react-router";
import type { Route } from "./+types/book-edit";
import type { Book } from "~/types/types";
import { bookLoader } from "~/utils/loaders";
import { BookForm } from "~/features/books-management/book-form";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { ButtonBack } from "~/ui/button-back";

export const clientLoader = bookLoader;

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const updatedData = {
    titleBook: String(formData.get("title")),
    author: String(formData.get("author")),
    nameGenre: String(formData.get("genre")),
    copies: Number(formData.get("copies")),
    description: String(formData.get("description")),
  };

  return null;
}

export default function BookEdit({ loaderData, params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const result = loaderData;

  const book: Book | null = "data" in result ? result.data : null;

  const bookToEdit = {
    titleBook: book?.title || "",
    nameGenre: book?.genre || "",
    author: book?.author || "",
    description: book?.description || "",
    copies: book?.copies || 0,
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
          action="/admin/libros/:bookId"
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
