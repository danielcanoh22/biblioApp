import { Timestamp } from "firebase/firestore";

import type { Route } from "./+types/books-management";
import type { Book } from "~/types/types";
import { useState } from "react";
import { createBook } from "~/services/apiBooks";
import { BookForm } from "~/features/books-management/book-form";
import { Button } from "~/ui/button";
import { Modal } from "~/ui/modal";
import { Table } from "~/ui/table";
import { TableActionButton } from "~/ui/table-action-button";
import { PrimaryTitle } from "~/ui/titles";
import toast from "react-hot-toast";

const books = [
  {
    id: "1234abc",
    title: "Harry Potter y el Prisionero de Azkaban",
    author: "J.K. Rowling",
    description:
      "Tras haber cumplido 13 años, solo y lejos de sus amigos, Harry se pelea con su tía Marge, a la que convierte en globo. Mientras tanto, de la prisión de Azkaban se ha escapado un terrible villano, Sirius Black, un asesino en serie con poderes mágicos que fue cómplice de Lord Voldemort y que parece dispuesto a borrar a Harry del mapa. Y por si esto fuera poco, Harry deberá enfrentarse también a unos terribles monstruos, los dementores, seres abominables capaces de robarles la felicidad a los magos y de eliminar todo recuerdo hermoso de aquellos que se arriesgan a mirarlos. Lo que ninguno de estos malvados sabe es que Harry, con la ayuda de sus fieles amigos Ron y Hermione, es capaz de todo.",

    genre: "Literatura Fantástica",
    copies: 15,
    image: "",
    created_at: Timestamp.fromDate(new Date()),
    formattedAuthor: "",
    formattedGenre: "",
  },
  {
    id: "5678abc",
    title: "Escrito en el Agua",
    author: "Paula Hawkins",
    description:
      "Pocos días antes de morir, Nel Abbott estuvo llamando a su hermana, pero Jules no cogió el teléfono, ignoró sus súplicas de ayuda. Ahora Nel está muerta. Dicen que saltó al río. Y Jules se ve arrastrada al pequeño pueblo de los veranos de su infancia, un lugar del que creía haber escapado, para cuidar de la adolescente que su hermana deja atrás. Pero Jules tiene miedo. Mucho miedo. Miedo al agua, miedo de sus recuerdos enterrados largo tiempo atrás, y miedo, sobre todo, de su certeza de que Nel nunca habría saltado…",
    genre: "Misterio",
    copies: 15,
    image: "",
    created_at: Timestamp.fromDate(new Date()),
    formattedAuthor: "",
    formattedGenre: "",
  },
];

const columns = [
  { key: "title", label: "Título" },
  { key: "author", label: "Autor" },
  { key: "description", label: "Descripción" },
  { key: "genre", label: "Género" },
  { key: "copies", label: "Copias" },
];

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const newBook = {
    author: String(formData.get("author")),
    genre: String(formData.get("genre")),
    title: String(formData.get("title")),
    copies: Number(formData.get("copies")),
    description: String(formData.get("description")),
    image: "",
  };

  const result = await createBook(newBook);

  if (!result || !result.success) {
    toast.error(result.message);
    return null;
  }

  toast.success("Libro agregado correctamente 😄");

  return result;
}

export default function BooksManagement() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <PrimaryTitle text="Gestionar Libros" />

      <div className="w-max mb-4">
        <Button onClick={() => setShowAddForm(true)}>+ Agregar libro</Button>
      </div>

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <h3 className="font-semibold text-center text-lg">Agregar Libro</h3>
        <BookForm onClose={() => setShowAddForm(false)} />
      </Modal>

      <Table
        columns={columns}
        data={books}
        actions={(book: Book) => (
          <>
            <TableActionButton url={book.id}>Editar</TableActionButton>
            <TableActionButton>Eliminar</TableActionButton>
          </>
        )}
      />
    </>
  );
}
