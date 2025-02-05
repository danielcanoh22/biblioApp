import { LucideInfo, LucideTriangleAlert } from "lucide-react";
import type { JSX } from "react";

type VariantType = "info" | "warning";

type MessageProps = {
  variant: VariantType;
  text: string;
};

const messageVariant: Record<
  VariantType,
  { styles: string; icon: JSX.Element }
> = {
  info: {
    styles: "bg-blue-100 text-blue-700",
    icon: <LucideInfo />,
  },
  warning: {
    styles: "bg-yellow-100 text-yellow-700",
    icon: <LucideTriangleAlert />,
  },
};

export const Message = ({ variant, text }: MessageProps) => {
  const message = messageVariant[variant];

  return (
    <div
      className={`${message.styles} p-3 rounded-md flex items-center gap-2 max-w-max`}
    >
      {message?.icon}
      <span>{text}</span>
    </div>
  );
};
