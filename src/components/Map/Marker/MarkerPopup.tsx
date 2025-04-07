import React from "react";
import { Flex, Card, Avatar } from "antd";
import ModelIcon from "../../shared/ModelIcon";
import StateIcon from "../../shared/StateIcon";
import { Equipment } from "../../../types/equipment";
import { getLastUpdateTimestamp } from "../../../utils/equipment";

type Props = {
  equipment: Equipment;
};

const MarkerPopup: React.FC<Props> = ({ equipment }) => {
  const { name, model, state, color, position } = equipment;
  const lastUpdated = getLastUpdateTimestamp(equipment);
  return (
    <Flex gap="middle" align="start" vertical>
      <Card size="small" style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={
            <Avatar
              icon={<ModelIcon model={model} />}
              style={{ backgroundColor: "#f0f0f0" }}
            />
          }
          title={name}
          description={
            <>
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <StateIcon state={state} color={color} /> {state}
                </span>
              </p>
              <p>
                <b>Posição:</b> {position[0]}, {position[1]}
              </p>
              <p>
                <b>Última atualização:</b> {lastUpdated || "Desconhecida"}
              </p>
            </>
          }
        />
      </Card>
    </Flex>
  );
};

export default MarkerPopup;
