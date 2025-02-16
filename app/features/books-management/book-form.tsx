import { Form, useFetcher } from "react-router";
import { ConfirmActions } from "~/ui/confirm-actions";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";

type BookFormProps = {
  onClose: () => void;
};

export const BookForm = ({ onClose }: BookFormProps) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="post"
      action="/admin/libros"
      className="mt-4 flex flex-col gap-6 sm:w-96"
    >
      <div className="flex flex-col gap-3">
        <FormRow id="title" label="Título">
          <Input id="title" placeholder="Ingresa el título del libro" />
        </FormRow>
        <FormRow id="author" label="Autor">
          <Input id="author" placeholder="Ingresa el autor del libro" />
        </FormRow>
        <FormRow id="genre" label="Género">
          <Input id="genre" placeholder="Ingresa el género del libro" />
        </FormRow>
        <FormRow id="copies" label="Copias disponibles">
          <Input
            type="number"
            id="copies"
            placeholder="Ingresa las copias disponibles"
          />
        </FormRow>
        <FormRow id="description" label="Descripción">
          <textarea
            id="description"
            rows={5}
            className="border border-gray-300 py-1 px-2 rounded-md text-gray-600 resize-none focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300  dark:text-gray-300 read-only:cursor-not-allowed"
          />
        </FormRow>
      </div>

      <ConfirmActions
        confirmText="Agregar"
        confirmType="submit"
        onCancel={onClose}
        onConfirm={() => {}}
      />
    </fetcher.Form>
  );
};
