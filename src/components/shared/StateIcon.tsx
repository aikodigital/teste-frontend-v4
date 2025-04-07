import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { EquipmentStateName } from "../../types/equipment";

type StateIconProps = {
  state: EquipmentStateName;
  color: string;
};

const StateIcon = ({ state, color }: StateIconProps) => {
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

export default StateIcon;
