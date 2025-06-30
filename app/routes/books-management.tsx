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
import { Form, redirect } from "react-router";
import { PaginationControls } from "~/ui/pagination-controls";

const DEFAULT_SELECT_OPTION = {
  author: "Seleccionar un autor",
  genre: "Seleccionar un género",
};

export const clientLoader = allBooksLoader;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const formAuthor =
    String(formData.get("author")) || String(formData.get("author-select"));
  const author = formAuthor === DEFAULT_SELECT_OPTION.author ? "" : formAuthor;

  const formGenre =
    String(formData.get("genre")) || String(formData.get("genre-select"));
  const genre = formGenre === DEFAULT_SELECT_OPTION.genre ? "" : formGenre;

  const copies = Number(formData.get("copies"));

  const newBook = {
    author,
    genre,
    title: String(formData.get("title")),
    total_copies: copies,
    available_copies: copies,
    description: String(formData.get("description")),
    image:
      "https://http2.mlstatic.com/D_NQ_NP_818687-MLU77433974018_072024-O.webp",
  };

  console.log(newBook);

  const result = await createBook(newBook);

  // if (!result?.succeeded) {
  //   toast.error(result.message);
  //   return null;
  // }

  // toast.success("Libro agregado correctamente 😄");

  // return redirect("/admin/libros");
  return null;
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
