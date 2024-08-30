import { Equipment } from "@/types/Equipment";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Equipment>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "modelName",
    header: "Modelo",
  },
  {
    accessorKey: "latestStateName",
    header: "Estado Atual",
  },
];
