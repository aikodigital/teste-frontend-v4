import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEquipmentHistory } from "@/hooks/use-equipment-history.hook";

export function EquipmentHistory({ equipmentId }: { equipmentId: string }) {
  const { data, loading, error } = useEquipmentHistory(equipmentId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!data) return <p>No history found for this equipment.</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ScrollArea className="w-full h-[70vh] mt-5">
      <ul className="flex flex-col gap-4">
        {data.history.map((entry, index) => (
          <li key={index}>
            <span className="flex flex-row items-center justify-between">
              <Badge
                className={
                  "hover:opacity-100 opacity-100 text-sm w-max min-w-[100px] flex items-center justify-center"
                }
                style={{ backgroundColor: entry.state?.color }}
              >
                {entry.state?.name}
              </Badge>

              <p className="text-neutral-600 text-sm italic mr-5">
                {new Date(entry.date).toLocaleString("pt-BR", {
                  weekday: "short",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "UTC", // Usando o UTC explicitamente
                })}
              </p>
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
