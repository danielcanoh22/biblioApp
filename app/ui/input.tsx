type InputProps = {
  type?: string;
  id: string;
  value?: string | number;
  defaultValue?: string | number;
  readOnly?: boolean;
  placeholder: string;
};

export const Input = ({
  type = "text",
  id,
  value,
  defaultValue,
  placeholder,
  readOnly = false,
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      defaultValue={type === "text" ? defaultValue : undefined}
      value={type === "number" ? value : undefined}
      placeholder={placeholder}
      readOnly={readOnly}
      className="border border-gray-300 py-1 px-2 rounded-md text-gray-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300  dark:text-gray-300 read-only:cursor-not-allowed"
    />
  );
};
