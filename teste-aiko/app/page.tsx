"use client";

import { SetStateAction, useState } from "react";
import { Equipment } from "./../types";
import MapView from "./components/MapView";
import EquipmentDetails from "./components/EquipmentDetails";
import { MainSearch } from "./components/MainSearch";

export default function Home() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );

  const [filters, setFilters] = useState({ searchTerm: "", status: "" });

  const handleFilterChange = (newFilters: SetStateAction<{ searchTerm: string; status: string; }>) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ searchTerm: "", status: "" });
  };

  return (
    <div>
      <h1 className="text-center">Monitoramento de Equipamentos</h1>
      <MainSearch onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      <div className="flex">
        <EquipmentDetails equipment={selectedEquipment} />
        <MapView filters={filters} onSelectEquipment={setSelectedEquipment} />
      </div>
    </div>
  );
}
