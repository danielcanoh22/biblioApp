import { useNavigate } from "react-router";
import type { Route } from "./+types/book-edit";
import { getBookById, updateBook } from "~/services/apiBooks";
import { BookForm } from "~/features/books-management/book-form";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { ButtonBack } from "~/ui/button-back";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const book = await getBookById(params.bookId);
  return { book };
}

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

  await updateBook(params.bookId, updatedData);
}

export default function BookEdit({ loaderData, params }: Route.ComponentProps) {
  const { book } = loaderData;
  const navigate = useNavigate();

  const handleCancelEdit = () => {
    navigate(-1);
  };

  return (
    <Container>
      <PrimaryTitle text="Editar libro" />

      {book ? (
        <BookForm
          book={book || undefined}
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
