import { Form } from "react-router";
import { Button } from "~/ui/button";
import { FormRow } from "~/ui/form-row";
import { Input } from "~/ui/input";

export const LoginForm = () => {
  return (
    <Form className="flex flex-col w-full max-w-lg gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
      <FormRow id="email" label="Correo electrónico">
        <Input id="email" type="email" placeholder="correo@ejemplo.com" />
      </FormRow>
      <FormRow id="password" label="Contraseña">
        <Input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
        />
      </FormRow>

      <Button type="submit">Ingresar</Button>
    </Form>
  );
};
