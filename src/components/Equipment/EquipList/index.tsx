import React from "react";
import { List } from "antd";
import { Equipment } from "../../../types/equipment";
import EquipmentItem from "./ListItem";

type EquipListProps = {
  equipments: Equipment[];
  onSelect: (equipment: Equipment) => void;
  selectedEquipment: Equipment | null;
};

const EquipList: React.FC<EquipListProps> = ({
  equipments,
  onSelect,
  selectedEquipment,
}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={equipments}
      renderItem={(item) => (
        <EquipmentItem
          key={item.id}
          equipment={item}
          onSelect={onSelect}
          selected={selectedEquipment?.id === item.id}
        />
      )}
    />
  );
};

export default EquipList;
