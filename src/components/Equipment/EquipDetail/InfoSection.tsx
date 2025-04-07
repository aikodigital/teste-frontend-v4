import React from "react";
import { Equipment } from "../../../types/equipment";
import { Badge, Descriptions, DescriptionsProps } from "antd";
import {
  getCurrentHourlyEarnings,
  formatLatLng,
} from "../../../utils/equipment";
import StateIcon from "../../shared/StateIcon";

interface InfoSectionprops {
  equipment: Equipment;
}

const InfoSection: React.FC<InfoSectionprops> = ({ equipment }) => {
  const earnings = getCurrentHourlyEarnings(equipment);

  const items: DescriptionsProps["items"] = [
    {
      label: "Modelo",
      span: "filled",
      children: equipment.model,
    },
    {
      label: "Estado",
      span: "filled",
      children: (
        <Badge
          count={StateIcon({ state: equipment.state, color: equipment.color })}
          text={equipment.state}
        />
      ),
    },
    {
      label: "Ganhos por hora",
      span: "filled",
      children: earnings,
    },
    {
      label: "Posição",
      span: "filled",
      children: formatLatLng(equipment.position),
    },
  ];

  return <Descriptions bordered items={items} />;
};

export default InfoSection;
