import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="w-full max-w-6xl mx-auto">{children}</div>;
};
