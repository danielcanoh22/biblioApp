export const DotSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2 h-16">
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
    </div>
  );
};
