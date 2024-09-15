import { getCurrentStateData } from "@/api/simulatedApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";

export const StateHistoryTable = ({
  equipmentStateHistory,
}: {
  equipmentStateHistory: {
    date: string;
    equipmentStateId: string;
  }[];
}) => {
  const sortedHistory = equipmentStateHistory.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  return (
    <Table>
      <TableHeader className="sticky top-0 bg-secondary z-10">
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedHistory.map((state, i) => (
          <TableRow key={i}>
            <TableCell>
              {new Date(state.date).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </TableCell>
            <TableCell
              className={cn(
                {
                  "text-[#e74c3c]":
                    getCurrentStateData(state.equipmentStateId).name ===
                    "Manutenção",
                  "text-[#f1c40f]":
                    getCurrentStateData(state.equipmentStateId).name ===
                    "Parado",
                  "text-[#2ecc71]":
                    getCurrentStateData(state.equipmentStateId).name ===
                    "Operando",
                },
                "font-bold"
              )}
            >
              {getCurrentStateData(state.equipmentStateId).name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
