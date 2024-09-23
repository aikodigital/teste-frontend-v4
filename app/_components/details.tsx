"use client";

import Search from "./search";
import { Button } from "./ui/button";
import { useState } from "react";
import EquipmentItem from "./equipment-item";
import equipment from "@/app/data/equipment.json";
import equipmentModels from "@/app/data/equipmentModel.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import equipmentStateProps from "@/app/data/equipmentState.json";
import { Badge } from "./ui/badge";
import Image from "next/image";

interface DetailsProps {
  showModal?: boolean;
}

const Details = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [modalOpen, setModalOpen] = useState(true);
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
    <>
      <Button
        className="p-5 rounded-full shadow-lg bg-white hover:bg-slate-200"
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
        <section className="rounded-lg w-full shadow-lg bg-white/80 py-5 h-[90vh]">
          <div className="">
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
            <div className="mt-5 px-5 h-[calc(90vh-270px)] overflow-hidden">
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
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Details;
