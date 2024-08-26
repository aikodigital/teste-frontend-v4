import { EquipmentModels } from "../types/equipment";
import React from "react";

export const getMarkerShape = (
  color: string,
  type: EquipmentModels,
  asHtmlElement: boolean = false
) => {
  let shape: string;

  if (type === "Caminhão de carga") {
    shape = `<div style="background-color: ${color}; padding: 10px;"></div>`;
  } else if (type === "Garra traçadora") {
    shape = `<div style="background-color: ${color}; padding: 10px; border-radius: 50%;"></div>`;
  } else {
    shape = `<div style="
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent; 
      border-right: 10px solid transparent; 
      border-bottom: 20px solid ${color}; 
    "></div>`;
  }

  if (asHtmlElement) {
    return (
      <span
        dangerouslySetInnerHTML={{ __html: shape.trim() }}
      />
    );
  }

  return shape;
};