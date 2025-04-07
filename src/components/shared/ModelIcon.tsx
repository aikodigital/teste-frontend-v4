import { ForkOutlined, ToolOutlined, TruckOutlined } from "@ant-design/icons";

type ModelIconProps = {
  model: string;
};

const ModelIcon = ({ model }: ModelIconProps) => {
  switch (model) {
    case "Garra traçadora":
      return <ForkOutlined style={{ color: "#000" }} />;
    case "Harvester":
      return <ToolOutlined style={{ color: "#000" }} />;
    case "Caminhão de carga":
      return <TruckOutlined style={{ color: "#000" }} />;
    default:
      return <>?</>;
  }
};

export default ModelIcon;
