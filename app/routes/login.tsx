import { Link } from "react-router";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-6">Login</h1>
      <Link to="/libros" className="bg-indigo-600 text-white p-2 rounded-md">
        Ingresar a la App
      </Link>
    </div>
  );
}
