type InputProps = {
  type?: string;
  placeholder: string;
};

export const Input = ({ type = "text", placeholder }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 py-1 px-2 rounded-md text-gray-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300"
    />
  );
};
