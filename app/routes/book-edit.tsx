import toast from "react-hot-toast";
import { redirect } from "react-router";
import { updateBook } from "~/services/apiBooks";
import type { Route } from "./+types/book-edit";
import { updateBookApiSchema } from "~/schemas/book";
import { bookLoader } from "~/utils/loaders/loaders";
import { BookForm } from "~/features/books-management/book-form";
import { Container } from "~/ui/container";
import { PrimaryTitle } from "~/ui/titles";
import { Message } from "~/ui/message";
import { ButtonHome } from "~/ui/button-home";
import { useMoveBack } from "~/hooks/useMoveBack";

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
  const result = loaderData;

  if ((result && !result.succeeded) || !result) {
    return (
      <div className="flex flex-col gap-4">
        <ButtonHome />
        <Message
          variant="warning"
          text="No se encontró el libro seleccionado"
        />
      </div>
    );
  }

  const moveBack = useMoveBack();
  const book = result.data;

  return (
    <Container>
      <PrimaryTitle text="Editar libro" />

      <BookForm
        book={book}
        action={`/admin/libros/${book?.id}/editar`}
        onCancel={moveBack}
      />
    </Container>
  );
}
