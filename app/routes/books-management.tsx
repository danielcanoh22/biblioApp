import toast from "react-hot-toast";
import type { Route } from "./+types/books-management";
import type { Book, Pagination } from "~/types/types";
import { allBooksLoader } from "~/utils/loaders";
import { createBook } from "~/services/apiBooks";
import { useState } from "react";
import { BookForm } from "~/features/books-management/book-form";
import { Button } from "~/ui/button";
import { Modal } from "~/ui/modal";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import { Container } from "~/ui/container";
import { Message } from "~/ui/message";
import { Form } from "react-router";
import { PaginationControls } from "~/ui/pagination-controls";
import { createBookApiSchema } from "~/schemas/book";

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

const DEFAULT_PAGINATION = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 1,
  limit: 1,
};

export default function BooksManagement({ loaderData }: Route.ComponentProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const result = loaderData;

  if (!result.succeeded && !!result.message)
    return <Message variant="warning" text={`ERROR: ${result.message}`} />;

  const books: Book[] = "data" in result ? result.data.books : [];
  const pagination: Pagination =
    "data" in result ? result.data.pagination : DEFAULT_PAGINATION;

  return (
    <Container>
      <PrimaryTitle text="Gestionar Libros" />

      <div className="mb-4 flex justify-between">
        <div className="w-max">
          <Button onClick={() => setShowAddForm(true)}>+ Agregar libro</Button>
        </div>
        <PaginationControls pagination={pagination} />
      </div>

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <h3 className="font-semibold text-center text-lg">Agregar Libro</h3>
        <BookForm onCancel={() => setShowAddForm(false)} />
      </Modal>

      {books.length > 0 ? (
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
          text="En este momento no hay ningún libro registrado."
        />
      )}
    </Container>
  );
}
