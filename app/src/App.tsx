import { useState } from "react";

import { MapComponent } from "./components/map";
import { fetchEquipments, filterEquipments } from "./api/simulatedApi";
import { EquipmentInfo } from "./components/equipmentInfo";
import { SelectFilter } from "./components/selectFilter";

import equipmentsModelsJson from "../data/equipmentModel.json";
import equipmentsStatesJson from "../data/equipmentState.json";

import { Model, State } from "./interfaces";
import { Input } from "./components/ui/input";

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

function App() {
  // Here I would use something like TenStack Query if it was an actual api call
  const [equipments, setEquipments] = useState(fetchEquipments());
  const [selectedModelId, setSelectedModel] = useState<string>("Todos");
  const [selectedStateId, setSelectedState] = useState<string>("Todos");
  const [nameInput, setNameInput] = useState<string>("");

  const [selectedEquipment, setSelectedEquipment] = useState<
    Equipment | undefined
  >(undefined);

  const modelsOptions = equipmentsModelsJson.map((model: Model) => ({
    id: model.id,
    name: model.name,
  }));

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);

    setEquipments(
      filterEquipments({
        modelId: modelId,
        stateId: selectedStateId,
      })
    );
  };

  const stateOptions = equipmentsStatesJson.map((state: State) => ({
    id: state.id,
    name: state.name,
  }));

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);

    setEquipments(
      filterEquipments({
        modelId: selectedModelId,
        stateId: stateId,
      })
    );
  };

  const handleNameInputChange = (value: string) => {
    setNameInput(value);

    setEquipments(
      filterEquipments({
        modelId: selectedModelId,
        stateId: selectedStateId,
        name: value,
      })
    );
  };

  return (
    <div className="p-2 md:p-4">
      <div className="flex mb-2 gap-4">
        <SelectFilter
          placeholder={"Selecione o modelo"}
          options={modelsOptions}
          handleChange={handleModelChange}
        />

        <SelectFilter
          placeholder={"Selecione o status"}
          options={stateOptions}
          handleChange={handleStateChange}
        />

        <Input
          type="text"
          placeholder="Nome do equipamento"
          value={nameInput}
          onChange={(e) => handleNameInputChange(e.target.value)}
          className="max-w-48"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2 p-1 border-2 border-neutral dark:border-white/80 rounded-md shadow-xl dark:shadow-white/10 h-[50vh] md:h-[64vh]">
          <MapComponent
            selectEquipment={setSelectedEquipment}
            selectedEquipment={selectedEquipment}
            equipments={equipments}
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Informações do Equipamento:</h1>

          {!selectedEquipment ? (
            <p>Por favor selecione um equipamento!</p>
          ) : (
            <EquipmentInfo equipment={selectedEquipment} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
