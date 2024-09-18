import React, { useState, useEffect, useRef } from "react";
import { FaRoute } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; 
import L from "leaflet";
import "leaflet/dist/leaflet.css"; 
import { useEquipmentContext } from "../../../context/EquipamentContext";

interface MapRouteProps {}

const MapRoute: React.FC<MapRouteProps> = () => {
  const { equipments, equipmentPositions, stateHistories, setFilteredPositions } = useEquipmentContext();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPositions, setFilteredPositionsState] = useState<any[]>([]);
  const [dateError, setDateError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (isVisible && mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [-19.126536, -45.947756],
        zoom: 10,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    }

    if (isVisible && mapInstance.current) {
      setTimeout(() => {
        mapInstance.current?.invalidateSize();
      }, 100);
    }
  }, [isVisible]);

  useEffect(() => {
    if (mapInstance.current && filteredPositions.length > 0) {
      mapInstance.current.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          mapInstance.current?.removeLayer(layer);
        }
      });

      const positionLatLngs: [number, number][] = filteredPositions.map(p => [p.lat, p.lon]);

      if (positionLatLngs.length > 0) {
        if (positionLatLngs.length > 1) {
          L.polyline(positionLatLngs, { color: "blue" }).addTo(mapInstance.current!);
        }

        positionLatLngs.forEach(([lat, lon], index) => {
          L.marker([lat, lon], {
            icon: L.divIcon({
              className: "custom-icon",
              html: `<div style="background-color: #4f46e5; border: 1px solid white; border-radius: 50%; padding: 8px; color: white; text-align: center; font-weight: bold; font-size: 14px; padding: 4px;">${index + 1}</div>`,
              iconSize: [30, 30],
            })
          }).addTo(mapInstance.current!)
            .bindPopup(`Data: ${filteredPositions[index].date}`);
        });

        const bounds = L.latLngBounds(positionLatLngs);
        mapInstance.current!.fitBounds(bounds);
      }
    }
  }, [filteredPositions]);

  useEffect(() => {
    if (selectedEquipmentId) {
      const selected = equipmentPositions.find(
        (e) => e.equipmentId === selectedEquipmentId
      );
      if (selected) {
        const dates = selected.positions.map((p) => new Date(p.date));
        
        const min = new Date(Math.min(...dates.map(date => date.getTime())));
        const max = new Date(Math.max(...dates.map(date => date.getTime())));
  
        setStartDate(min.toISOString().split("T")[0]);
        setEndDate(max.toISOString().split("T")[0]);
  
        setFilteredPositionsState(
          selected.positions.filter((p) => {
            const positionDate = new Date(p.date).getTime();
            return positionDate >= min.getTime() && positionDate <= max.getTime();
          })
        );
      }
    }
  }, [selectedEquipmentId, equipmentPositions]);
  
  const handleApplyFilters = () => {
    if (!startDate || !endDate) {
      setDateError("Por favor, selecione um intervalo de datas.");
      return;
    }
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (start > end) {
      setDateError("A data inicial não pode ser maior que a data final.");
      return;
    }
    setDateError(null);

    if (selectedEquipmentId) {
      const selected = equipmentPositions.find(
        (e) => e.equipmentId === selectedEquipmentId
      );
      if (selected) {
        const newFilteredPositions = selected.positions.filter(p => {
          const positionDate = new Date(p.date).getTime();
          return positionDate >= start && positionDate <= end;
        });

        const positionsWithStates = newFilteredPositions.map(p => {
          const stateHistory = stateHistories.find(sh => sh.equipmentId === selectedEquipmentId);
          const stateAtPosition = stateHistory?.states.find(s => new Date(s.date).getTime() === new Date(p.date).getTime());
          return {
            ...p,
            stateId: stateAtPosition?.equipmentStateId || null
          };
        });

        setFilteredPositions(positionsWithStates);
        setFilteredPositionsState(positionsWithStates);
        setShowPreview(true); 
      }
    }
  };

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Tippy
      content={
        <div className="flex flex-col space-y-4 bg-white rounded-lg p-4">
          <h2 className="text-gray-900 text-xl border-b-2 pb-2">
            Rota do Equipamento:
          </h2>
          <div className="flex flex-col space-y-2">
            <p className="text-gray-700">Selecione um equipamento para visualizar a rota.</p>
            <select
              onChange={(e) => setSelectedEquipmentId(e.target.value)}
              value={selectedEquipmentId || ""}
              className="p-2 border border-gray-300 rounded-lg shadow-sm"
            >
              <option value="" disabled>
                Selecione um equipamento
              </option>
              {equipments.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            {selectedEquipmentId && (
              <div className="flex flex-col space-y-2 mt-4">
                <p className="text-gray-700">Selecione um intervalo de datas:</p>
                <div className="flex flex-col gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg shadow-sm"
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg shadow-sm"
                  />
                  <button
                    onClick={handleApplyFilters}
                    className="p-2 bg-indigo-600 text-white rounded-lg"
                  >
                    Aplicar Filtros
                  </button>
                  {dateError && (
                    <p className="text-red-500 text-sm mt-2">{dateError}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            id="map"
            ref={mapRef}
            style={{ height: "300px", width: "100%" }}
            className="border rounded-lg"
          />
        </div>
      }
      interactive={true}
      visible={isVisible}
      onClickOutside={() => setIsVisible(false)}
      placement="right"
    >
      <button
        className="p-2 bg-indigo-600 text-white rounded-full shadow-lg"
        onClick={handleToggle}
      >
        <FaRoute />
      </button>
    </Tippy>
  );
};

export default MapRoute;
