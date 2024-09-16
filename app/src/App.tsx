import { useEffect, useState } from "react";

import { MapComponent } from "./components/map";
import {
  fetchEquipments,
  fetchOrderedEquipmentPositions,
  filterEquipments,
} from "./api/simulatedApi";
import { EquipmentInfo } from "./components/equipmentInfo";
import { SelectFilter } from "./components/selectFilter";

import equipmentsModelsJson from "../data/equipmentModel.json";
import equipmentsStatesJson from "../data/equipmentState.json";

import { Model, State } from "./interfaces";
import { Input } from "./components/ui/input";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./components/ui/button";
import { cn } from "./utils/cn";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./components/ui/calendar";
import { DateRange } from "react-day-picker";
import { APIProvider } from "@vis.gl/react-google-maps";

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

function App() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Here I would use something like TenStack Query if it was an actual api call
  const [equipments, setEquipments] = useState(fetchEquipments());
  const [selectedModelId, setSelectedModel] = useState<string>("Todos");
  const [selectedStateId, setSelectedState] = useState<string>("Todos");
  const [nameInput, setNameInput] = useState<string>("");
  const [positionHistory, setPositionHistory] =
    useState<{ date: string; lat: number; lon: number }[]>();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2021, 1, 20),
    to: addDays(new Date(2021, 1, 20), 5),
  });
  const [selectedEquipment, setSelectedEquipment] = useState<
    Equipment | undefined
  >(undefined);

  const formattedFromDate = date?.from
    ? format(date.from, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    : undefined;

  const formattedToDate = date?.to
    ? format(date.to, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    : undefined;

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

  useEffect(() => {
    if (selectedEquipment) {
      setPositionHistory(
        fetchOrderedEquipmentPositions(
          selectedEquipment.id,
          formattedFromDate,
          formattedToDate
        )
      );
    }
  }, [selectedEquipment]);

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <div className="p-2 md:p-4">
          <div className="flex flex-col md:flex-row mb-2 gap-4 w-full">
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
              className="w-full md:w-[180px]"
            />

            <div className=" z-30 gap-4 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal w-full md:w-[300px]",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className="z-50 block bg-basis border-2 rounded-md mx-6"
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 p-1 border-2 border-neutral dark:border-white/80 rounded-md shadow-xl dark:shadow-white/10 h-[50vh] md:h-[64vh] mt-1">
              <MapComponent
                selectEquipment={setSelectedEquipment}
                selectedEquipment={selectedEquipment}
                equipments={equipments}
                positionHistory={positionHistory}
              />
            </div>
            <div className="md:w-1/2 flex flex-col gap-4">
              <h1 className="text-2xl font-bold">
                Informações do Equipamento:
              </h1>

              {!selectedEquipment ? (
                <p>Por favor selecione um equipamento no mapa ao lado!</p>
              ) : (
                <EquipmentInfo
                  equipment={selectedEquipment}
                  formattedFromDate={formattedFromDate}
                  formattedToDate={formattedToDate}
                />
              )}
            </div>
          </div>
        </div>
      </APIProvider>
    </>
  );
}

export default App;
