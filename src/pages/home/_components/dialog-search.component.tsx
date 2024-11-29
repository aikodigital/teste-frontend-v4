import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAllData } from "@/hooks/use-all-data/use-all-data.hook";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";
import { useEquipmentStore } from "@/stores/equipment.store";

export function DialogSearchComponent() {
  const { isSearching, setSearching, openSheet } = useEquipmentStore();
  const { search, setSearch } = useEquipmentMapStore();
  const { allData } = useAllData();

  const filteredData = allData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.equipmentModel?.name?.toLowerCase().includes(search.toLowerCase()),
  );

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
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="w-full justify-between flex items-center my-4"
                >
                  <div className="flex flex-row items-center justify-start">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.state.color }}
                    />
                    {item.name} - {item.equipmentModel?.name}
                  </div>

                  <Button
                    variant={"ghost"}
                    className="text-neutral-900"
                    onClick={() => {
                      setSearching(false);
                      openSheet(item);
                    }}
                  >
                    Ver histórico
                  </Button>
                </div>
              ))
            ) : (
              <div className="my-5 flex w-full items-center justify-center">
                Nenhum resultado encontrado
              </div>
            )}
          </div>
        ) : (
          <div className="h-10"></div>
        )}
      </DialogContent>
    </Dialog>
  );
}
