import { forwardRef } from "react";

type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className="border border-gray-300 py-1 px-2 rounded-md text-gray-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300  dark:text-gray-300 read-only:cursor-not-allowed"
      />
    );
  }
);
