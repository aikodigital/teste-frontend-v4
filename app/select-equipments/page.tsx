"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import Search from "../_components/search";
import { Button } from "../_components/ui/button";
import EquipmentItem from "../_components/equipment-item";

import equipment from "@/app/data/equipment.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import equipmentStateProps from "@/app/data/equipmentState.json";
import { Badge } from "../_components/ui/badge";
import Menu from "../_components/menu";

const EquipmentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredEquipment = equipment.filter((equip) => {
    if (selectedCategory === "Todos") return true;

    const equipmentState = equipmentStateHistory.find(
      (state) => state.equipmentId === equip.id
    );
    const lastStateId =
      equipmentState?.states[equipmentState.states.length - 1]
        .equipmentStateId || "";

    return (
      equipmentStateProps.find((state) => state.id === lastStateId)?.name ===
      selectedCategory
    );
  });

  return (
    <main className="flex justify-center items-center h-screen">
      <section className="h-[100vh] w-[100vw] lg:w-[80%]">
        <h1 className="text-xl font-semibold my-5 px-5">
          Selecionar Equipamento
        </h1>
        <div className="flex items-center px-5">
          <Search />
          <Button variant="ghost" className="ml-3 px-2">
            <SearchIcon size={20} />
          </Button>
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
            {filteredEquipment.map((equip, index) => {
              const equipmentState = equipmentStateHistory.find(
                (state) => state.equipmentId === equip.id
              );
              const lastStateId =
                equipmentState?.states[equipmentState.states.length - 1]
                  .equipmentStateId || "";
              return (
                <li key={index}>
                  <EquipmentItem equip={equip} statusId={lastStateId} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <div className="z-50 fixed bottom-3 left-auto right-auto">
        <Menu />
      </div>
    </main>
  );
};

export default EquipmentPage;
