import { getCurrentStateData } from "@/api/simulatedApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const StateHistoryTable = ({
  equipmentStateHistory,
}: {
  equipmentStateHistory: {
    date: string;
    equipmentStateId: string;
  }[];
}) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 bg-secondary z-[100]">
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipmentStateHistory.map((state, i) => (
          <TableRow key={i}>
            <TableCell>
              {new Date(state.date).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </TableCell>
            <TableCell>
              {getCurrentStateData(state.equipmentStateId).name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
