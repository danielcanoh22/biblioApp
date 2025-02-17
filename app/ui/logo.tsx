export const Logo = () => {
  return (
    <>
      <img
        src="/logo-light.png"
        alt="Logo de la Librería Michi"
        className="w-20 block dark:hidden"
      />
      <img
        src="/logo-dark.png"
        alt="Logo de la Librería Michi"
        className="w-20 hidden dark:block"
      />
    </>
  );
};
