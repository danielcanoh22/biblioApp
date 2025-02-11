import { LucidePencil, LucideTrash } from "lucide-react";
import { Button } from "~/ui/button";
import { Table } from "~/ui/table";
import { PrimaryTitle } from "~/ui/titles";

const books = [
  {
    title: "Harry Potter y el Prisionero de Azkaban",
    author: "J.K. Rowling",
    description:
      "Tras haber cumplido 13 años, solo y lejos de sus amigos, Harry se pelea con su tía Marge, a la que convierte en globo. Mientras tanto, de la prisión de Azkaban se ha escapado un terrible villano, Sirius Black, un asesino en serie con poderes mágicos que fue cómplice de Lord Voldemort y que parece dispuesto a borrar a Harry del mapa. Y por si esto fuera poco, Harry deberá enfrentarse también a unos terribles monstruos, los dementores, seres abominables capaces de robarles la felicidad a los magos y de eliminar todo recuerdo hermoso de aquellos que se arriesgan a mirarlos. Lo que ninguno de estos malvados sabe es que Harry, con la ayuda de sus fieles amigos Ron y Hermione, es capaz de todo.",

    genre: "Literatura Fantástica",
    copies: 15,
  },
  {
    title: "Escrito en el Agua",
    author: "Paula Hawkins",
    description:
      "Pocos días antes de morir, Nel Abbott estuvo llamando a su hermana, pero Jules no cogió el teléfono, ignoró sus súplicas de ayuda. Ahora Nel está muerta. Dicen que saltó al río. Y Jules se ve arrastrada al pequeño pueblo de los veranos de su infancia, un lugar del que creía haber escapado, para cuidar de la adolescente que su hermana deja atrás. Pero Jules tiene miedo. Mucho miedo. Miedo al agua, miedo de sus recuerdos enterrados largo tiempo atrás, y miedo, sobre todo, de su certeza de que Nel nunca habría saltado…",
    genre: "Misterio",
    copies: 15,
  },
];

const columns = [
  { key: "title", label: "Título" },
  { key: "author", label: "Autor" },
  { key: "description", label: "Descripción" },
  { key: "genre", label: "Género" },
  { key: "copies", label: "Copias" },
];

export default function BooksManagement() {
  return (
    <>
      <PrimaryTitle text="Gestionar Libros" />

      <Table
        columns={columns}
        data={books}
        actions={() => (
          <>
            <Button>
              <LucidePencil size={15} />
            </Button>
            <Button variant="destructive">
              <LucideTrash size={15} />
            </Button>
          </>
        )}
      />
    </>
  );
}
