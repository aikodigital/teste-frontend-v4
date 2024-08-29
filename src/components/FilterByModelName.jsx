import { Button, Flex, Select } from "@mantine/core";
import { useState } from "react";

function FilterByModelName({ initialEquipments, setEquipments }) {
  const [value, setValue] = useState("");

  const filterEquipmentByModelName = (equipmentModel) => {
    const filteredEquipments = initialEquipments.filter((equipment) => equipment.modelName === equipmentModel);

    setEquipments(filteredEquipments);
  };

  return (
    <Flex align="end" w="fit-content" gap={30}>
      <Select
        value={value}
        onChange={(value) => setValue(value ?? "")}
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={[
          { value: "Caminhão de carga", label: "Caminhão de carga" },
          { value: "Harvester", label: "Harvester" },
          { value: "Garra traçadora", label: "Garra traçadora" },
        ]}
        styles={{
          dropdown: {
            zIndex: 2,
          },
        }}
      />
      <Button onClick={() => filterEquipmentByModelName(value)}>Filtrar por modelo</Button>
    </Flex>
  );
}

export default FilterByModelName;
