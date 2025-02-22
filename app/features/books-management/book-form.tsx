import { useFetcher } from "react-router";
import type { Book } from "~/types/types";
import { ConfirmActions } from "~/ui/confirm-actions";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const method = book ? "patch" : "post";

    fetcher.submit(formData, { method, action });
  };

  return (
    <fetcher.Form
      action={action}
      className="mt-4 flex flex-col gap-6 sm:w-96"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <FormRow id="title" label="Título">
          <Input
            id="title"
            placeholder="Ingresa el título del libro"
            defaultValue={book?.titleBook}
          />
        </FormRow>
        <FormRow id="author" label="Autor">
          <Input
            id="author"
            placeholder="Ingresa el autor del libro"
            defaultValue={book?.author}
          />
        </FormRow>
        <FormRow id="genre" label="Género">
          <Input
            id="genre"
            placeholder="Ingresa el género del libro"
            defaultValue={book?.nameGenre}
          />
        </FormRow>
        <FormRow id="copies" label="Copias disponibles">
          <Input
            type="number"
            id="copies"
            placeholder="Ingresa las copias disponibles"
            defaultValue={book?.copies}
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
