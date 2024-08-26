import { Equipment } from "@/types/Equipment";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Equipment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "equipmentModelId",
    header: "Modelo ID",
  },
];
