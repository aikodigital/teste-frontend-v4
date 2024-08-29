"use client";

import { SearchIcon } from "lucide-react";
import Search from "./search";
import { Button } from "./ui/button";
import { useState } from "react";
import EquipmentItem from "./equipment-item";
import equipment from "@/app/data/equipment.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import equipmentStateProps from "@/app/data/equipmentState.json";
import { Badge } from "./ui/badge";
import Image from "next/image";

const Details = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [modalOpen, setModalOpen] = useState(true);

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
    <>
      <Button className="p-5 rounded-full shadow-lg bg-white hover:bg-slate-200"
        onClick={() => setModalOpen(!modalOpen)}
        >
        <Image
          src="/aiko.png"
          alt="Logo"
          priority
          style={{ width: "auto", height: "auto" }}
          width={50}
          height={25}
        />
      </Button>
      {modalOpen ? (
        <section className="rounded-lg w-full shadow-lg bg-white/80 py-5">
          <div className="">
            <h1 className="text-xl font-semibold mb-5 px-5">
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
                    selectedCategory === state.name
                      ? "opacity-100"
                      : "opacity-50"
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
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Details;
