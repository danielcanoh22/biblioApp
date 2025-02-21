type BadgeStatusProps = {
  status: string;
};

const statusClasses: Record<string, string> = {
  pendiente: "bg-orange-200 text-orange-900",
  activo: "bg-green-200 text-green-900",
  devuelto: "bg-indigo-200 text-indigo-900",
};

export const BadgeStatus = ({ status }: BadgeStatusProps) => {
  return (
    <div
      className={`capitalize text-sm py-1 px-3 w-max rounded-full font-medium ${statusClasses[status]}`}
    >
      <span className="capitalize">{status}</span>
    </div>
  );
};
