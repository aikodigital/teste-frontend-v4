import React from "react";
import { Marker, Popup } from "react-leaflet";
import EquipmentPopup from "./EquipmentPopup";

/**
 * EquipmentMarker component renders a Leaflet marker for a given equipment.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.equipment - The equipment object.
 * @param {number} props.equipment.latitude - The latitude coordinate of the equipment.
 * @param {number} props.equipment.longitude - The longitude coordinate of the equipment.
 * @returns {JSX.Element}
 */
function EquipmentMarker({ equipment }) {
  return (
    <Marker position={[equipment.latitude, equipment.longitude]}>
      <Popup>
        <EquipmentPopup equipment={equipment} />
      </Popup>
    </Marker>
  );
}

export default EquipmentMarker;
