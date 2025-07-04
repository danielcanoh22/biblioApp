import toast from "react-hot-toast";
import { Form } from "react-router";
import { useState } from "react";
import { createBook } from "~/services/apiBooks";
import type { Route } from "./+types/books-management";
import type { Book } from "~/types/books";
import { createBookApiSchema } from "~/schemas/book";
import { allBooksLoader } from "~/utils/loaders/loaders";
import { useFilteredBooks } from "~/features/books/hooks/useFilteredBooks";
import { BookForm } from "~/features/books-management/book-form";
import { Button } from "~/ui/button";
import { Modal } from "~/ui/modal";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import { Container } from "~/ui/container";
import { Message } from "~/ui/message";
import { FiltersToolbar } from "~/ui/filters-toolbar";

export const clientLoader = allBooksLoader;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submissionData = Object.fromEntries(formData.entries());

  if (submissionData.total_copies) {
    submissionData.total_copies = submissionData.available_copies;
  }

  const validationResult = createBookApiSchema.safeParse(submissionData);

  if (!validationResult.success) {
    toast.error("Por favor, corrige los errores del formulario.");
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  const result = await createBook(validationResult.data);

  if (!result?.succeeded) {
    toast.error(result.message);
    return null;
  }

  toast.success("Libro agregado correctamente 😄");

  return result;
}

const BOOKS_TABLE_COLUMNS = [
  { key: "title", label: "Título" },
  { key: "author", label: "Autor" },
  { key: "description", label: "Descripción" },
  { key: "genre", label: "Género" },
  { key: "available_copies", label: "Copias" },
];

export default function BooksManagement({ loaderData }: Route.ComponentProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const result = loaderData;

  if ((result && !result.succeeded) || !result)
    return (
      <Message
        variant="warning"
        text="Ha ocurrido un error al cargar los libros disponibles"
      />
    );

  const { books, pagination, hasBooks, totalBooks } = useFilteredBooks(
    result.data.books,
    result.data.pagination
  );

  return (
    <Container>
      <PrimaryTitle text="Gestionar Libros" />

      <div className="w-max mb-6">
        <Button onClick={() => setShowAddForm(true)}>+ Agregar libro</Button>
      </div>

      <FiltersToolbar
        fieldName="title"
        placeholder="Ingresa el nombre de un libro"
        pagination={pagination}
      />

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <h3 className="font-semibold text-center text-lg">Agregar Libro</h3>
        <BookForm onCancel={() => setShowAddForm(false)} />
      </Modal>

      {hasBooks ? (
        totalBooks > 0 ? (
          <Table
            columns={BOOKS_TABLE_COLUMNS}
            data={books}
            actions={(book: Book) => (
              <>
                <TableActionButton url={`${book.id}/editar`}>
                  Editar
                </TableActionButton>
                <Form
                  action={`${book.id}/eliminar`}
                  method="post"
                  onSubmit={(event) => {
                    const response = confirm(
                      "Please confirm you want to delete this record."
                    );
                    if (!response) {
                      event.preventDefault();
                    }
                  }}
                >
                  <TableActionButton type="submit">Eliminar</TableActionButton>
                </Form>
              </>
            )}
          />
        ) : (
          <Message
            variant="info"
            text="No hay ningún libro que coincida con los filtros de búsqueda"
          />
        )
      ) : (
        <Message
          variant="info"
          text="En este momento no hay ningún libro registrado"
        />
      )}
    </Container>
  );
}
