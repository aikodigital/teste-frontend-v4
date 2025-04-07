import React, { useEffect, useRef } from "react";
import { Badge, Avatar, List } from "antd";
import { Equipment } from "../../../types/equipment";
import { getModelIcon, getStateIcon } from "./Icons";
import { getLastUpdateTimestamp } from "../../../utils/equipment";

type EquipmentItemProps = {
  equipment: Equipment;
  onSelect: (equipment: Equipment) => void;
  selected: boolean;
};

const EquipmentItem: React.FC<EquipmentItemProps> = ({
  equipment,
  onSelect,
  selected,
}) => {
  const { name, model, state, color } = equipment;
  const lastUpdated = getLastUpdateTimestamp(equipment);
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selected]);

  return (
    <div ref={itemRef}>
      <List.Item
        style={{ cursor: "pointer" }}
        onClick={() => onSelect(equipment)}
        className={selected ? "equipment-item selected" : "equipment-item"}
      >
        <List.Item.Meta
          avatar={
            <Badge count={getStateIcon(state, color)}>
              <Avatar
                icon={getModelIcon(model)}
                shape="circle"
                size="large"
                style={{ backgroundColor: "#f0f0f0" }}
              />
            </Badge>
          }
          title={name}
          description={
            <span>
              <b>Estado:</b> {state}
              <br />
              <b>Modelo:</b> {model}
              <br />
              <b>Última atualização:</b>
              <br />
              {lastUpdated || "Desconhecida"}
            </span>
          }
        />
      </List.Item>
    </div>
  );
};

export default EquipmentItem;
