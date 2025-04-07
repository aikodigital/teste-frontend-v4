import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEquipments } from "../../hooks/useEquipments";
import { useStates } from "../../hooks/useStates";
import { useModels } from "../../hooks/useModels";
import FilterSidebar from "../blocks/FilterSidebar";
import EquipmentMap from "../blocks/EquipmentMap";
import Loading from "../blocks/Loading";

export function Home() {
  const [filter, setFilter] = React.useState({});
  const data = useEquipments(filter);
  const states = useStates();
  const models = useModels();

  function handleStateChange(e) {
    setFilter({ ...filter, stateId: e });
  }

  function handleModelChange(e) {
    setFilter({ ...filter, modelId: e });
  }
  if (!data || !states || !models) return <Loading />;

  return (
    <Grid
      templateColumns={{ lg: "repeat(4,1fr)" }}
      templateRows={{ base: "repeat(4,1fr)" }}
      overflow={"hidden"}
      h="100vh"
    >
      <GridItem>
        <FilterSidebar
          states={states}
          models={models}
          onStateChange={handleStateChange}
          onModelChange={handleModelChange}
        />
      </GridItem>
      <GridItem colSpan={{ lg: 3 }} rowSpan={{ lg: 4, base: 3 }}>
        <EquipmentMap equipments={data} />
      </GridItem>
    </Grid>
  );
}
