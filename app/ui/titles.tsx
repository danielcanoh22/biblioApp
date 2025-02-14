type TitleProps = {
  text: string;
};

export const PrimaryTitle = ({ text }: TitleProps) => {
  return (
    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      {text}
    </h1>
  );
};
