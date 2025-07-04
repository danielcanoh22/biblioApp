import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "~/context/AuthContext";
import { loginUser } from "~/services/apiAuth";
import type { LoginFormValues } from "~/types/auth";
import { Button } from "~/ui/button";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await loginUser(data);

    if (result.succeeded) {
      login(result.data.user);
      navigate("/libros");
    } else {
      setLoginError(result.message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-lg gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700"
    >
      <FormRow
        id="email"
        label="Correo electrónico"
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder="correo@ejemplo.com"
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
        label="Contraseña"
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: 6,
          })}
        />
      </FormRow>

      {loginError.length > 0 ? (
        <p className="text-red-400">{loginError}</p>
      ) : null}

      <Button type="submit">Ingresar</Button>
    </Form>
  );
};
