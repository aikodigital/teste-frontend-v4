import { divIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { EquipmentStateName } from "../types/equipment";
import ModelIcon from "../components/shared/ModelIcon";

interface GetEquipmentMapIconProps {
  model: string;
  state: EquipmentStateName;
  color: string;
  isSelected?: boolean;
}

const getEquipmentMapIcon = ({
  model,
  color,
  isSelected,
}: GetEquipmentMapIconProps) => {
  return divIcon({
    className: "",
    html: `<div class="marker-wrapper ${isSelected ? "selected" : ""}" style="background-color: ${color}">${renderToString(<ModelIcon model={model} />)}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default getEquipmentMapIcon;
