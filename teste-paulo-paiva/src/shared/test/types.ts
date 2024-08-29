import { ComponentPublicInstance } from "vue";
import { Equipment } from "@/modules/equipments/dtos/equipmentDto"; // Atualize o caminho se necessário

// Interface para a instância do componente ListComponent
export interface ListEquipmentsInstance extends ComponentPublicInstance {
  filteredItems: Equipment[];
  paginatedItems: Equipment[];
  updateCurrentPage(page: number): void;
  fetchFirstPage(): void;
  fetchLastPage(): void;
  currentPage: number;
  perPage: number;
}
