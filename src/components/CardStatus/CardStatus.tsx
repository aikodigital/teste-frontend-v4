export default function CardStatus({
  status,
  date,
  hours,
  color,
}: {
  status: string;
  date: string;
  hours: string;
  color: string;
}) {
  return (
    <div className=" w-full flex items-center justify-between border-x border-b p-2 gap-2">
      <div className="flex items-center gap-2 w-[20%]">
        <div
          className="p-1 w-2 h-4 flex rounded-md text-xs text-white"
          style={{ backgroundColor: color }}
        />
        <span className="flex justify-start">{status}</span>
      </div>
      <div className=" w-10 flex items-center justify-between">
        <span>
          {new Date(date).toLocaleString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </div>
      <span>{hours}</span>
    </div>
  );
}
