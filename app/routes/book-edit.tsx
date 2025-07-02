import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/book-edit";
import { bookLoader } from "~/utils/loaders";
import { BookForm } from "~/features/books-management/book-form";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { ButtonBack } from "~/ui/button-back";
import { updateBook } from "~/services/apiBooks";
import { updateBookApiSchema } from "~/schemas/book";

export const clientLoader = bookLoader;

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const { bookId } = params;

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const validationResult = updateBookApiSchema.safeParse(data);

  if (!validationResult.success) {
    toast.error("Por favor, corrige los errores en el formulario.");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  const result = await updateBook(bookId, validationResult.data);

  if (!result?.succeeded) {
    toast.error(result.message);
    return null;
  }

  toast.success("Libro actualizado correctamente 😄");

  return redirect("/admin/libros");
}

export default function BookEdit({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const result = loaderData;

  if (!result.succeeded)
    return (
      <div className="flex flex-col gap-4">
        <ButtonBack />

        <Message variant="warning" text={`ERROR: ${result.message}`} />
      </div>
    );

  const book = result.data;

  const handleCancelEdit = () => {
    navigate(-1);
  };

  return (
    <Container>
      <PrimaryTitle text="Editar libro" />

      <BookForm
        book={book}
        action={`/admin/libros/${book?.id}/editar`}
        onCancel={handleCancelEdit}
      />
    </Container>
  );
}
