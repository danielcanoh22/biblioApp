import { useForm, type SubmitHandler } from "react-hook-form";
import { useFetcher } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAuthors } from "../books/hooks/useAuthors";
import { useGenres } from "../books/hooks/useGenres";
import type { Book } from "~/types/globals";
import { ConfirmActions } from "~/ui/confirm-actions";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";
import { Select } from "~/ui/select";
import { FormSkeleton } from "~/ui/form-skeleton";

type BookFormProps = {
  book?: Book;
  action?: string;
  onCancel: () => void;
};

export type BookFormValues = {
  title: string;
  description: string;
  image: string;
  total_copies: number;
  available_copies?: number;
  author_id?: string;
  new_author_name?: string;
  genre_id?: string;
  new_genre_name?: string;
};

const DEFAULT_ACTION = "/admin/libros";

export const BookForm = ({
  book,
  action = DEFAULT_ACTION,
  onCancel: onClose,
}: BookFormProps) => {
  const fetcher = useFetcher();
  const isEditMode = Boolean(book);

  const [isNewAuthor, setIsNewAuthor] = useState(
    isEditMode ? !book?.author_id : false
  );
  const [isNewGenre, setIsNewGenre] = useState(
    isEditMode ? !book?.genre_id : false
  );

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<BookFormValues>({
    defaultValues: {
      title: book?.title ?? "",
      description: book?.description ?? "",
      image:
        book?.image ??
        "https://tse2.mm.bing.net/th/id/OIP.jzmqPLfT1iRpQuiU1leqWgHaLk?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      total_copies: book?.total_copies ?? undefined,
      available_copies: book?.available_copies ?? undefined,
      author_id: book?.author_id ? String(book.author_id) : "",
      new_author_name: "",
      genre_id: book?.genre_id ? String(book.genre_id) : "",
      new_genre_name: "",
    },

    mode: "onBlur",
  });

  // TODO: Refactorizar para no utilizar useEffect

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setValue("author_id", "");
      setValue("new_author_name", "");
    }
  }, [isNewAuthor, setValue]);

  useEffect(() => {
    if (isMounted.current) {
      setValue("genre_id", "");
      setValue("new_genre_name", "");
    }
  }, [isNewGenre, setValue]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !fetcher.data.errors) {
      if (!isEditMode) reset();
      onClose();
    }
  }, [fetcher.state, fetcher.data, isEditMode, reset, onClose]);

  const onSubmit: SubmitHandler<BookFormValues> = (data) => {
    const method = isEditMode ? "PATCH" : "POST";

    const payload = { ...data };

    if (!isNewAuthor) delete payload.new_author_name;
    if (isNewAuthor) delete payload.author_id;
    if (!isNewGenre) delete payload.new_genre_name;
    if (isNewGenre) delete payload.genre_id;

    fetcher.submit(payload, { method, action });
  };

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
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-6 sm:w-96 h-[75vh] overflow-y-auto"
    >
      <div className="flex flex-col gap-3">
        <FormRow id="image" label="Imagen" error={errors.image?.message}>
          <Input
            id="image"
            placeholder="Ingresa la portada del libro"
            {...register("image", {
              required: "La URL de la imagen es obligatoria.",
            })}
            disabled={isSubmitting}
          />
        </FormRow>
        <FormRow id="title" label="Título" error={errors.title?.message}>
          <Input
            id="title"
            placeholder="Ingresa el título del libro"
            {...register("title", {
              required: "El título es obligatorio.",
            })}
            disabled={isSubmitting}
          />
        </FormRow>

        <FormRow
          id="author"
          label="Autor"
          error={errors.author_id?.message || errors.new_author_name?.message}
        >
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="isNewAuthorCheckbox"
              checked={isNewAuthor}
              onChange={() => setIsNewAuthor(!isNewAuthor)}
            />
            <label htmlFor="isNewAuthorCheckbox" className="dark:text-gray-300">
              Crear nuevo autor
            </label>
          </div>
          {isNewAuthor ? (
            <Input
              id="new_author_name"
              disabled={isSubmitting}
              {...register("new_author_name", {
                required: isNewAuthor
                  ? "Debes ingresar un nombre para el nuevo autor."
                  : false,
                minLength: {
                  value: 2,
                  message: "Debe tener al menos 2 caracteres.",
                },
              })}
            />
          ) : (
            <Select
              options={authors.data}
              id="author_id"
              disabled={isSubmitting}
              {...register("author_id", {
                required: !isNewAuthor
                  ? "Debes seleccionar un autor de la lista."
                  : false,
              })}
            />
          )}
        </FormRow>
        <FormRow
          id="genre"
          label="Género"
          error={errors.genre_id?.message || errors.new_genre_name?.message}
        >
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="isNewGenreCheckbox"
              checked={isNewGenre}
              onChange={() => setIsNewGenre(!isNewGenre)}
            />
            <label htmlFor="isNewGenreCheckbox" className="dark:text-gray-300">
              Crear nuevo autor
            </label>
          </div>
          {isNewGenre ? (
            <Input
              id="new_genre_name"
              disabled={isSubmitting}
              {...register("new_genre_name", {
                required: isNewGenre
                  ? "Debes ingresar un nombre para el nuevo género."
                  : false,
                minLength: {
                  value: 2,
                  message: "Debe tener al menos 2 caracteres.",
                },
              })}
            />
          ) : (
            <Select
              options={genres.data}
              id="genre_id"
              disabled={isSubmitting}
              {...register("genre_id", {
                required: !isNewGenre
                  ? "Debes seleccionar un género de la lista."
                  : false,
              })}
            />
          )}
        </FormRow>

        {book ? (
          <FormRow
            id="total_copies"
            label="Copias totales"
            error={errors.total_copies?.message}
          >
            <Input
              type="number"
              id="total_copies"
              placeholder="Ingresa las copias totales"
              {...register("total_copies", {
                required: "El total de copias es obligatorio.",
                valueAsNumber: true,
                min: { value: 1, message: "Debe haber al menos 1 copia." },
              })}
              disabled={isSubmitting}
            />
          </FormRow>
        ) : null}
        <FormRow
          id="available_copies"
          label="Copias disponibles"
          error={errors.available_copies?.message}
        >
          <Input
            type="number"
            id="available_copies"
            placeholder="Ingresa las copias disponibles"
            {...register("available_copies", {
              required: "El valor de copias disponibles es obligatorio.",
              valueAsNumber: true,
              min: { value: 1, message: "Debe haber al menos 1 copia." },
            })}
            disabled={isSubmitting}
          />
        </FormRow>
        <FormRow
          id="description"
          label="Descripción"
          error={errors.description?.message}
        >
          <textarea
            id="description"
            rows={5}
            className="border border-gray-300 py-1 px-2 rounded-md text-gray-600 resize-none focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300  dark:text-gray-300 read-only:cursor-not-allowed"
            {...register("description", {
              required: "La descripción es obligatoria.",
            })}
            disabled={isSubmitting}
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
