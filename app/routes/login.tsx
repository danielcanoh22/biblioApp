import { LoginForm } from "~/features/auth/login-form";
import { Logo } from "~/ui/logo";
import { PrimaryTitle } from "~/ui/titles";

export default function Login() {
  return (
    <div className="flex flex-col gap-4 p-4 items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 md:p-0">
      <Logo />
      <PrimaryTitle text="Iniciar sesión" />
      <LoginForm />
    </div>
  );
}
