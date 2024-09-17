import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import { useEquipmentContext } from "../contexts/equipment";
import { useEquipmentDetailsContext } from "../contexts/equipmentDetailsContext";
import { createSvgIcon } from "../utils/createSvgIcon";

const EquipmentMap: React.FC = () => {
  const { equipments } = useEquipmentContext();
  const { selectedEquipment, setSelectedEquipment } =
    useEquipmentDetailsContext();
  const mapRef = useRef<L.Map | null>(null);
  const pathLayerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    const mapInstance = L.map("map").setView([-19.0942, -45.8822], 8);
    mapRef.current = mapInstance;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance);

    equipments.forEach((equipment) => {
      if (!equipment.positions || !equipment.states) return;

      const marker = L.marker(
        [equipment.positions[0].lat, equipment.positions[0].lon],
        {
          icon: createSvgIcon(
            equipment.equipmentModel!.name,
            equipment.states[0].equipmentState.color,
          ),
        },
      ).addTo(mapInstance);

      marker.bindPopup(
        `<b>${equipment.name}</b><br />Estado atual: ${equipment.states[0].equipmentState.name}<br />Modelo: ${equipment.equipmentModel?.name}`,
      );

      marker.on("click", () => {
        setSelectedEquipment(equipment);
      });
    });

    return () => {
      mapInstance.remove();
    };
  }, [equipments, setSelectedEquipment]);

  useEffect(() => {
    if (mapRef.current && selectedEquipment) {
      if (pathLayerRef.current) {
        mapRef.current.removeLayer(pathLayerRef.current);
      }

      if (selectedEquipment.positions) {
        const latLngs: L.LatLngExpression[] = selectedEquipment.positions.map(
          (pos) => [pos.lat, pos.lon] as L.LatLngExpression,
        );

        const newPathLayer = L.polyline(latLngs, { color: "blue" }).addTo(
          mapRef.current,
        );
        pathLayerRef.current = newPathLayer;

        mapRef.current.fitBounds(newPathLayer.getBounds());
      }
    }
  }, [selectedEquipment]);

  return <div id="map" className="w-full h-full rounded-lg shadow-lg"></div>;
};

export { EquipmentMap };