import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEquipmentData } from "@/hooks/use-equipment-data.hook";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";
import { useEquipmentStore } from "@/stores/equipment.store";

export function DialogSearch() {
  const { isSearching, setSearching } = useEquipmentStore();
  const { search, setSearch } = useEquipmentMapStore();
  const { searchData } = useEquipmentData();
  console.log(searchData);

  return (
    <Dialog open={isSearching} onOpenChange={() => setSearching(!isSearching)}>
      <DialogContent className="w-1/2 max-w-1/2">
        <DialogHeader>
          <DialogTitle>Pesquise</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Digite aqui"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search ? (
          <div>
            {searchData.length > 0 ? (
              searchData.map((item) => (
                <div key={item.id}>
                  {item.name} - {item.model}
                </div>
              ))
            ) : (
              <div>No results found</div>
            )}
          </div>
        ) : (
          <div>
            <p>Nenhuma pesquisa</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
