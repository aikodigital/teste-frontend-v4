import React from "react";
import { Center, Grid, GridItem } from "@chakra-ui/react";
import { useEquipment } from "../../hooks/useEquipment";
import { useParams } from "react-router-dom";
import EquipmentInfo from "../blocks/EquipmentInfo";
import EquipmentPositions from "../blocks/EquipmentPositions";
import EquipmentStateHistory from "../blocks/EquipmentStateHistory";
import Link from "../blocks/Link";
import Loading from "../blocks/Loading";
import Text from "../blocks/Text";

export function Details() {
  const { equipmentId } = useParams();
  const data = useEquipment(equipmentId);

  if (!data) return <Loading />;

  return (
    <Center>
      <Grid
        templateRows="repeat(10, 1fr)"
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        gap="40px"
        style={{ height: "100vh", width: "80vw" }}
      >
        <GridItem mt={{ base: 10, lg: 0 }} colSpan={{ lg: 3, base: 1 }}>
          <Text variant="title">{data.equipmentName}</Text>
        </GridItem>

        <GridItem rowSpan={8}>
          <EquipmentInfo data={data} />
        </GridItem>

        <GridItem rowSpan={8}>
          <EquipmentPositions data={data} />
        </GridItem>

        <GridItem rowSpan={8}>
          <EquipmentStateHistory data={data} />
        </GridItem>

        <GridItem colSpan={{ lg: 3, base: 1 }}>
          <Center py="5">
            <Link to="/">Voltar</Link>
          </Center>
        </GridItem>
      </Grid>
    </Center>
  );
}
