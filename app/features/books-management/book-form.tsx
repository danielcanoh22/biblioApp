import { useFetcher } from "react-router";
import type { Book } from "~/types/types";
import { ConfirmActions } from "~/ui/confirm-actions";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";
import { Select } from "~/ui/select";
import { useAuthors } from "../books/hooks/useAuthors";
import { useGenres } from "../books/hooks/useGenres";
import { useState } from "react";
import { FormSkeleton } from "~/ui/form-skeleton";

type BookFormProps = {
  book?: Book;
  action?: string;
  onCancel: () => void;
};

const DEFAULT_ACTION = "/admin/libros";

export const BookForm = ({
  book,
  action = DEFAULT_ACTION,
  onCancel: onClose,
}: BookFormProps) => {
  const fetcher = useFetcher();

  const {
    authors,
    isPending: isPendingAuthors,
    isError: isErrorAuthors,
  } = useAuthors();
  const {
    genres,
    isPending: isPendingGenres,
    isError: isErrorGenres,
  } = useGenres();

  const [isNewAuthor, setIsNewAuthor] = useState(false);
  const [isNewGenre, setIsNewGenre] = useState(false);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);

  //   const method = book ? "patch" : "post";

  //   fetcher.submit(formData, { method, action });
  // };

  if (isPendingAuthors || isPendingGenres) {
    return <FormSkeleton />;
  }

  if (isErrorAuthors || isErrorGenres) {
    return (
      <p className="text-red-500">
        Error al cargar datos necesarios para el formulario.
      </p>
    );
  }

  if (!authors?.succeeded || !genres?.succeeded) {
    return (
      <p className="text-red-500">
        No se pudieron obtener los autores o géneros.
      </p>
    );
  }

  return (
    <fetcher.Form
      action={action}
      method="post"
      className="mt-4 flex flex-col gap-6 sm:w-96 h-[75vh] overflow-y-auto"
      // onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <FormRow id="image" label="Imagen">
          <Input
            id="image"
            placeholder="Ingresa la portada del libro"
            defaultValue={book?.image}
          />
        </FormRow>
        <FormRow id="title" label="Título">
          <Input
            id="title"
            placeholder="Ingresa el título del libro"
            defaultValue={book?.title}
          />
        </FormRow>

        <FormRow id="author" label="Autor">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="isNewAuthor"
              checked={isNewAuthor}
              onChange={(e) => setIsNewAuthor(e.target.checked)}
            />
            <label htmlFor="isNewAuthor" className="text-xs dark:text-gray-300">
              Crear nuevo autor
            </label>
          </div>

          {isNewAuthor ? (
            <Input id="new_author_name" placeholder="Nombre del nuevo autor" />
          ) : (
            <Select options={authors.data} id="author-select" />
          )}
        </FormRow>

        <FormRow id="genre" label="Género">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="isNewGenre"
              checked={isNewGenre}
              onChange={(e) => setIsNewGenre(e.target.checked)}
            />
            <label htmlFor="isNewGenre" className="text-xs dark:text-gray-300">
              Crear nuevo género
            </label>
          </div>

          {isNewGenre ? (
            <Input id="new_genre_name" placeholder="Nombre del nuevo género" />
          ) : (
            <Select options={genres.data} id="genre-select" />
          )}
        </FormRow>
        <FormRow id="copies" label="Copias disponibles">
          <Input
            type="number"
            id="copies"
            placeholder="Ingresa las copias disponibles"
            value={book?.available_copies}
          />
        </FormRow>
        <FormRow id="description" label="Descripción">
          <textarea
            id="description"
            name="description"
            rows={5}
            className="border border-gray-300 py-1 px-2 rounded-md text-gray-600 resize-none focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300  dark:text-gray-300 read-only:cursor-not-allowed"
            defaultValue={book?.description}
          />
        </FormRow>
      </div>

      <ConfirmActions
        confirmText={!book ? "Agregar" : "Actualizar"}
        confirmType="submit"
        onCancel={onClose}
        onConfirm={() => {}}
      />
    </fetcher.Form>
  );
};
