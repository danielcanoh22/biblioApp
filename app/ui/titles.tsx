type TitleProps = {
  text: string;
};

export const PrimaryTitle = ({ text }: TitleProps) => {
  return (
    <h1 className="text-2xl font-semibold dark:text-white mb-4">{text}</h1>
  );
};
