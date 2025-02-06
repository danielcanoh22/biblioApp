type TypeButton = "button" | "submit" | "reset";

type ButtonProps = {
  type: TypeButton;
  text: string;
  onClick?: () => void;
};

export const Button = ({ type, text, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-indigo-600 text-white py-2 px-4 rounded-md w-full cursor-pointer transition-colors duration-200 hover:bg-indigo-800"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
