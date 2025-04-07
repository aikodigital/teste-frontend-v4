import {
  TruckOutlined,
  ForkOutlined,
  ToolOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { EquipmentStateName } from "../../../types/equipment";

export const getModelIcon = (model: string) => {
  switch (model) {
    case "Garra traçadora":
      return <ForkOutlined style={{ color: "#000" }} />;
    case "Harvester":
      return <ToolOutlined style={{ color: "#000" }} />;
    case "Caminhão de carga":
      return <TruckOutlined style={{ color: "#000" }} />;
    default:
      return <Avatar icon="?" style={{ color: "#000" }} />;
  }
};

export const getStateIcon = (state: EquipmentStateName, color: string) => {
  switch (state) {
    case "Operando":
      return <CheckCircleFilled style={{ color }} />;
    case "Parado":
      return <CloseCircleFilled style={{ color }} />;
    case "Manutenção":
      return <ExclamationCircleFilled style={{ color }} />;
    default:
      return null;
  }
};
