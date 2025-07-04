import { useForm, type SubmitHandler } from "react-hook-form";
import { useFetcher } from "react-router";
import { USER_ROLE, type RegisterFormValues } from "~/types/auth";
import type { User } from "~/types/users";
import { ConfirmActions } from "~/ui/confirm-actions";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";

type UserFormProps = {
  user?: User;
  action?: string;
  onCancel: () => void;
};

const DEFAULT_ACTION = "/admin/usuarios";

export const UserForm = ({
  user,
  action = DEFAULT_ACTION,
  onCancel: onClose,
}: UserFormProps) => {
  const fetcher = useFetcher();

  const isEditMode = Boolean(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || USER_ROLE.USER,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const method = isEditMode ? "PATCH" : "POST";

    fetcher.submit(data, {
      method,
      action,
    });
    onClose();
  };

  return (
    <fetcher.Form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="mt-4 flex flex-col gap-6 sm:w-96"
    >
      <div className="flex flex-col gap-3">
        <FormRow id="name" label="Nombre" error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Ingresa el nombre del usuario"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: 1,
            })}
          />
        </FormRow>
        <FormRow
          id="email"
          label="Correo electrónico"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder="Ingresa el correo electrónico del usuario"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Ingresa una dirección de correo válida",
              },
            })}
          />
        </FormRow>
        <FormRow
          id="password"
          label={isEditMode ? "Nueva Contraseña (opcional)" : "Contraseña"}
          error={errors.password?.message}
        >
          <Input
            id="password"
            type="password"
            placeholder="Ingresa la contraseña del usuario"
            {...register("password", {
              required: !isEditMode ? "La contraseña es obligatoria" : false,
              minLength: {
                value: 6,
                message: "La nueva contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
        </FormRow>
        <FormRow id="role" label="Rol" error={errors.role?.message}>
          <select
            id="role"
            className="border p-2 rounded-md border-gray-300 text-sm cursor-pointer dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300"
            {...register("role")}
          >
            <option value="user" className="dark:bg-dark">
              Usuario
            </option>
            <option value="admin" className="dark:bg-dark">
              Admin
            </option>
          </select>
        </FormRow>
      </div>

      <ConfirmActions
        confirmText={!user ? "Agregar" : "Actualizar"}
        confirmType="submit"
        onCancel={onClose}
        onConfirm={() => {}}
      />
    </fetcher.Form>
  );
};
