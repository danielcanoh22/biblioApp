import { useFetcher } from "react-router";
import { ConfirmActions } from "~/ui/confirm-actions";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";

type UserFormProps = {
  onClose: () => void;
};

export const UserForm = ({ onClose }: UserFormProps) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" className="mt-4 flex flex-col gap-6 sm:w-96">
      <div className="flex flex-col gap-3">
        <FormRow id="name" label="Nombre">
          <Input id="name" placeholder="Ingresa el nombre del usuario" />
        </FormRow>
        <FormRow id="email" label="Correo electrónico">
          <Input
            id="email"
            placeholder="Ingresa el correo electrónico del usuario"
          />
        </FormRow>
        <FormRow id="rol" label="Rol">
          <select
            name="rol"
            id="rol"
            className="border p-2 rounded-md border-gray-300 text-sm cursor-pointer dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300"
          >
            <option value="admin" className="dark:bg-dark">
              Admin
            </option>
            <option value="user" className="dark:bg-dark">
              Usuario
            </option>
          </select>
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
