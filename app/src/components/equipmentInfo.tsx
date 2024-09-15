import { useEffect, useState } from "react";
import {
  calculateProductivity,
  fetchEquipmentModel,
  fetchOrderedEquipmentState,
  getCurrentStateData,
} from "../api/simulatedApi";
import { Equipment } from "../interfaces";
import { StateHistoryTable } from "./stateHistoryTable";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProductivityCalculator } from "./productivityCalculator";

export const EquipmentInfo = ({ equipment }: { equipment: Equipment }) => {
  const [equipmentStateHistory, setEquipmentStateHistory] = useState(
    fetchOrderedEquipmentState(equipment.id)
  );

  const [currentState, setCurrentState] = useState<{
    id: string;
    name: string;
    color: string;
  }>();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2020, 0, 20),
    to: addDays(new Date(2020, 0, 20), 1000),
  });

  const formattedFromDate = date?.from
    ? format(date.from, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    : undefined;

  const formattedToDate = date?.to
    ? format(date.to, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    : undefined;

  useEffect(() => {
    setEquipmentStateHistory(
      fetchOrderedEquipmentState(
        equipment.id,
        formattedFromDate,
        formattedToDate
      )
    );
  }, [equipment, formattedFromDate, formattedToDate]);

  useEffect(() => {
    const allStates = fetchOrderedEquipmentState(equipment.id);

    if (allStates.length > 0) {
      setCurrentState(getCurrentStateData(allStates[0].equipmentStateId));
    }
  }, [equipment]);

  return (
    <div>
      <p>
        Nome:
        <span className="font-bold"> {equipment.name}</span>
      </p>
      <p>
        Modelo:
        <span className="font-bold">
          {" "}
          {fetchEquipmentModel(equipment?.equipmentModelId).name}
        </span>
      </p>
      <p>
        Status Atual:{" "}
        {currentState ? (
          <span
            className={cn("font-bold", {
              "text-[#2ecc71]": currentState.color === "#2ecc71",
              "text-[#f1c40f]": currentState.color === "#f1c40f",
              "text-[#e74c3c]": currentState.color === "#e74c3c",
            })}
          >
            {currentState.name}
          </span>
        ) : (
          <span className="text-muted-foreground">Sem histórico</span>
        )}
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold mt-4">Histórico de operação: </p>

        <div className="z-20 flex  gap-4 items-center">
          <p>Selecione o período: </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
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
                className="z-30"
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

        <div className="flex gap-2">
          <p>Produtividade: </p>

          <p>
            {calculateProductivity(
              equipment.id,
              formattedFromDate,
              formattedToDate
            ).toFixed(2)}
            %
          </p>

          <p className="font-bold"> | </p>

          <p>Rentabilidade: </p>

          <p>
            {calculateProductivity(
              equipment.id,
              formattedFromDate,
              formattedToDate
            ).toFixed(2)}
            %
          </p>
        </div>

        <div>
          <div className="relative rounded-md border overflow-auto max-h-[30vh]">
            <StateHistoryTable equipmentStateHistory={equipmentStateHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};
