import { TypeEquipmentBasic } from "@/types/equipmentTypes";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useEquipment } from "@/context/EquipmentContext";
import { getModel } from "@/helpers/equipments";

export const MapComponent = ({
  equipments,
}: {
  equipments: TypeEquipmentBasic[];
}) => {
  if (!equipments) throw new Error("Map component must a position");

  const navigate = useNavigate();

  const { setSelectedEquipment } = useEquipment();

  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false,
      center: [-14.235, -51.9253],
      zoom: 0,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      { minZoom: 5, maxZoom: 18 }
    ).addTo(map);

    equipments.map((equipment) => {
      if (equipment.lastPosition) {
        if (equipments.length === 1) {
          L.marker([
            equipment.lastPosition.lat,
            equipment.lastPosition.lon,
          ]).addTo(map);
        } else {
          const modelInfo = getModel(equipment.equipmentModelId);
          const marker = L.marker([
            equipment.lastPosition.lat,
            equipment.lastPosition.lon,
          ]).addTo(map);

          marker.on("mouseover", () => {
            const popupContainer = document.createElement("div");
            popupContainer.className = "popup";
            popupContainer.onclick = () => {
              navigate("equipmentDetail");
              setSelectedEquipment(equipment);
            };
            ReactDOM.render(
              <div className="w-52 h-32 flex">
                <div className="w-1/2 h-full flex justify-center items-center">
                  <img src={modelInfo?.image} alt={modelInfo?.name} />
                </div>
                <div className="flex flex-col items-center justify-center pl-6">
                  {modelInfo?.name} <br /> {equipment.name}
                </div>
              </div>,
              popupContainer
            );
            marker.bindPopup(popupContainer).openPopup();
          });

          marker.on("click", () => {
            navigate("equipmentDetail");
            setSelectedEquipment(equipment);
          });
        }
      }
    });

    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipments]);

  return <div id="map" className="h-full"></div>;
};
