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
      <ul>
        {data.history.map((entry, index) => (
          <li key={index}>
            <strong>{entry.date}</strong>:{" "}
            {entry.type === "position" ? (
              <>
                Position - Lat: {entry.position?.lat}, Lon:{" "}
                {entry.position?.lon}
              </>
            ) : (
              <>
                State - {entry.state?.name} ({entry.state?.color})
              </>
            )}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
