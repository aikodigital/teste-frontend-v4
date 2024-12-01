import { useEffect, useMemo, useState } from "react";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";
import { ProcessedEquipment } from "@/types/equipment.type";

export function useFilteredEquipmentData(allData: ProcessedEquipment[]) {
  const { selectedState, selectedModel, search } = useEquipmentMapStore();
  const [filteredData, setFilteredData] = useState<ProcessedEquipment[]>([]);

  useEffect(() => {
    let data = [...allData];

    if (selectedState) {
      data = data.filter((item) => item.state.name === selectedState);
    }

    if (selectedModel) {
      data = data.filter((item) => item.equipmentModel?.name === selectedModel);
    }

    setFilteredData(data);
  }, [selectedState, selectedModel, allData]);

  const searchResults = useMemo(() => {
    if (search) {
      return allData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return [];
  }, [search, allData]);

  return { filteredData, searchResults };
}
