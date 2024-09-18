"use client";
import React, { useEffect, useState } from "react";
import useEquipmentStore from "@/store/useEquipmentStore"; // Zustand Store
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

// Definir o tamanho e estilo do mapa
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Definir os ícones exclusivos com tamanhos proporcionais
interface EquipmentIcon {
  url: string;
  scaledSize: google.maps.Size;
}

const equipmentIcons: Record<
  "Caminhão de carga" | "Harvester" | "Garra traçadora" | "default",
  EquipmentIcon
> = {
  "Caminhão de carga": {
    url: "/icons/truck.png",
    scaledSize: new window.google.maps.Size(40, 40),
  },
  Harvester: {
    url: "/icons/farm.png",
    scaledSize: new window.google.maps.Size(40, 40),
  },
  "Garra traçadora": {
    url: "/icons/mechanic.png",
    scaledSize: new window.google.maps.Size(40, 40),
  },
  default: {
    url: "/icons/default.png",
    scaledSize: new window.google.maps.Size(40, 40),
  },
};

// Interface para o equipamento selecionado
interface SelectedEquipment {
  id: string;
  position: {
    lat: number;
    lon: number;
  };
  model: string;
  state: string;
  name: string;
}

const EquipmentTable = () => {
  const {
    equipment,
    loadEquipmentData,
    getLatestPosition,
    getLatestState,
    getEquipmentModel,
  } = useEquipmentStore();

  const [selectedEquipment, setSelectedEquipment] =
    useState<SelectedEquipment | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    loadEquipmentData().then(() => {
      console.log("Dados carregados:", equipment);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadEquipmentData]);

  const handleMapClick = (equipmentId: string) => {
    const position = getLatestPosition(equipmentId);
    const equipmentItem = equipment.find((eq) => eq.id === equipmentId);
    if (position && equipmentItem) {
      const equipmentState = getLatestState(equipmentId);
      const equipmentModel = getEquipmentModel(equipmentItem.equipmentModelId);
      setSelectedEquipment({
        id: equipmentId,
        position,
        model: equipmentModel?.name || "Modelo Desconhecido",
        state: equipmentState?.name || "Desconhecido",
        name: equipmentItem.name || "Nome Desconhecido",
      });

      setMapCenter({
        lat: position.lat,
        lng: position.lon,
      });

      setShowMapModal(true);
    }
  };

  const closeMapModal = () => {
    setShowMapModal(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Equipamentos</h1>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-800">
              <th className="px-2 py-2 text-sm md:text-base lg:px-4">Nome</th>
              <th className="px-2 py-2 text-sm md:text-base lg:px-4">Modelo</th>
              <th className="px-2 py-2 text-sm md:text-base lg:px-4">
                Produtividade (%)
              </th>
              <th className="px-2 py-2 text-sm md:text-base lg:px-4">Ganho</th>
              <th className="px-2 py-2 text-sm md:text-base lg:px-4">Estado</th>
              <th className="px-2 py-2 text-sm md:text-base lg:px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipment.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-800">
                  Carregando dados...
                </td>
              </tr>
            ) : (
              equipment.map((eq) => {
                const equipmentModel = getEquipmentModel(eq.equipmentModelId);
                const produtividade = (Math.random() * 100).toFixed(2);

                return (
                  <tr key={eq.id} className="border-b text-gray-800">
                    <td className="px-2 py-2 text-sm md:text-base lg:px-4">
                      {eq.name || "Nome Desconhecido"}
                    </td>
                    <td className="px-2 py-2 text-sm md:text-base lg:px-4">
                      {equipmentModel?.name || "Modelo Desconhecido"}
                    </td>
                    <td className="px-2 py-2 text-sm md:text-base lg:px-4">
                      {produtividade}%
                    </td>
                    <td className="px-2 py-2 text-sm md:text-base lg:px-4">
                      {equipmentModel?.hourlyEarnings[0]?.value || 0}
                    </td>
                    <td className="px-2 py-2 text-sm md:text-base lg:px-4">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          getLatestState(eq.id)?.name === "Operando"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {getLatestState(eq.id)?.name || "Desconhecido"}
                      </span>
                    </td>
                    <td className="px-2 py-2 space-x-2 text-sm md:text-base lg:px-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleMapClick(eq.id)}
                            >
                              Ver no Mapa
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            Visualizar posição no mapa
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {showMapModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-xl">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded"
              onClick={closeMapModal}
            >
              Fechar
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selectedEquipment.name} - {selectedEquipment.model}
            </h3>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={10}
            >
              <Marker
                position={{
                  lat: selectedEquipment.position.lat,
                  lng: selectedEquipment.position.lon,
                }}
                icon={
                  equipmentIcons[
                    selectedEquipment.model as keyof typeof equipmentIcons
                  ] || equipmentIcons.default
                }
              />
              {selectedEquipment && (
                <InfoWindow
                  position={{
                    lat: selectedEquipment.position.lat,
                    lng: selectedEquipment.position.lon,
                  }}
                  onCloseClick={() => setSelectedEquipment(null)}
                >
                  <div>
                    <h3>{selectedEquipment.name}</h3>
                    <p>{selectedEquipment.model}</p>
                    <p>{selectedEquipment.state}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentTable;
