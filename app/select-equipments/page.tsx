"use client";

import { useState } from "react";
import Search from "../_components/search";
import EquipmentItem from "../_components/equipment-item";

import equipment from "@/app/data/equipment.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import equipmentStateProps from "@/app/data/equipmentState.json";
import equipmentModels from "@/app/data/equipmentModel.json";
import { Badge } from "../_components/ui/badge";
import Menu from "../_components/menu";

const EquipmentList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const equipmentWithState = equipment.map((equip) => {
    const equipmentStateHistoryEntry = equipmentStateHistory.find(
      (state) => state.equipmentId === equip.id
    );

    const lastStateId = equipmentStateHistoryEntry
      ? equipmentStateHistoryEntry.states.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0].equipmentStateId
      : "";

    const equipmentModel = equipmentModels.find(
      (model) => model.id === equip.equipmentModelId
    );

    return {
      ...equip,
      lastStateId,
      modelName: equipmentModel?.name || "",
    };
  });

  const filteredEquipment = equipmentWithState.filter((equip) => {
    const matchesCategory =
      selectedCategory === "Todos" ||
      equipmentStateProps.find((state) => state.id === equip.lastStateId)
        ?.name === selectedCategory;

    const matchesSearchTerm =
      equip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equip.modelName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });

  return (
    <main className="flex justify-center items-center h-screen">
      <section className="h-[100vh] w-[100vw] lg:w-[80%]">
        <h1 className="text-xl font-semibold my-5 px-5">
          Selecionar Equipamento
        </h1>
        <div className="w-full px-5">
          <Search value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="mt-5 flex space-x-6 items-center overflow-x-auto border-t border-b w-full py-5 px-5">
          <span
            onClick={() => handleCategorySelect("Todos")}
            className={`text-sm font-semibold whitespace-nowrap px-2 py-1 cursor-pointer border rounded-full ${
              selectedCategory === "Todos" ? "opacity-100" : "opacity-50"
            }`}
          >
            Todos
          </span>
          {equipmentStateProps.map((state, index) => (
            <Badge
              key={index}
              onClick={() => handleCategorySelect(state.name)}
              className={`text-sm whitespace-nowrap px-2 py-1 rounded-full cursor-pointer ${
                selectedCategory === state.name ? "opacity-100" : "opacity-50"
              }`}
              style={{
                backgroundColor: state.color,
                color: "white",
              }}
            >
              • {state.name}
            </Badge>
          ))}
        </div>
        <div className="mt-5 px-5 h-[calc(100vh-300px)] overflow-hidden">
          <ul className="flex flex-col gap-3 w-full overflow-y-auto h-full pb-5">
            {filteredEquipment.map((equip, index) => (
              <li key={index}>
                <EquipmentItem
                  equip={equip}
                  statusId={equip.lastStateId || ""}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="z-50 fixed bottom-3 left-auto right-auto">
        <Menu />
      </div>
    </main>
  );
};

export default EquipmentList;
