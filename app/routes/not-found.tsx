import { ButtonHome } from "~/ui/button-home";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-screen h-screen">
      <p className="text-4xl dark:text-gray-300">
        No se encontró la página a la que intentabas acceder
      </p>
      <div className="text-xl">
        <ButtonHome />
      </div>
    </div>
  );
}
