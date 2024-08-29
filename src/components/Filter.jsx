import { Button, Flex, Select } from "@mantine/core";
import { useState } from "react";

function Filter({ initialEquipments, setEquipments }) {
  const [filterType, setFilterType] = useState("Estado");
  const [value, setValue] = useState("");
  const modelOptions = [
    { value: "Caminhão de carga", label: "Caminhão de carga" },
    { value: "Harvester", label: "Harvester" },
    { value: "Garra traçadora", label: "Garra traçadora" },
    { value: "Todos", label: "Todos" },
  ];
  const stateOptions = [
    { value: "Operando", label: "Operando" },
    { value: "Parado", label: "Parado" },
    { value: "Manutenção", label: "Manutenção" },
    { value: "Todos", label: "Todos" },
  ];

  const filterEquipmentByModelName = (equipmentModel) => {
    if (equipmentModel === "Todos") {
      setEquipments(initialEquipments);

      return null;
    }

    const filteredEquipments = initialEquipments.filter((equipment) => equipment.modelName === equipmentModel);
    setEquipments(filteredEquipments);
  };

  const filterEquipmentByStateName = (state) => {
    if (state === "Todos") {
      setEquipments(initialEquipments);

      return null;
    }

    const filteredEquipments = initialEquipments.filter((equipment) => equipment.lastKnownState.name === state);
    setEquipments(filteredEquipments);
  };

  return (
    <Flex align="end" w="fit-content" gap={30}>
      <Select
        data={[
          { value: "Modelo", label: "Modelo" },
          { value: "Estado", label: "Estado" },
        ]}
        label="Escolha o filtro"
        onChange={(filterType) => setFilterType(filterType ?? "")}
        placeholder="Escolha um"
        value={filterType}
        styles={{
          dropdown: {
            zIndex: 2,
          },
        }}
        transitionProps={{ transition: "pop-top-left", duration: 80, timingFunction: "ease" }}
        withinPortal
      />
      <Select
        data={filterType === "Estado" ? stateOptions : modelOptions}
        label="Opções"
        onChange={(value) => setValue(value ?? "")}
        placeholder="Escolha um"
        value={value}
        styles={{
          dropdown: {
            zIndex: 2,
          },
        }}
        transitionProps={{ transition: "pop-top-left", duration: 80, timingFunction: "ease" }}
        withinPortal
      />
      <Button
        disabled={value.length === 0}
        onClick={() => {
          filterType === "Estado" ? filterEquipmentByStateName(value) : filterEquipmentByModelName(value);
        }}
      >
        Filtrar por modelo
      </Button>
    </Flex>
  );
}

export default Filter;
