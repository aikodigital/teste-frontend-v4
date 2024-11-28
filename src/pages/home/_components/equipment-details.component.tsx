import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEquipmentStore } from "@/stores/equipment.store";
import { EquipmentHistory } from "./equipment-history.component";
import { StatusBadge } from "../../../components/status-badge.component";
import {
  calculateEquipmentEarnings,
  ICalculateEarnings,
} from "@/utils/calculate-earnings";
import { MapRouteComponent } from "./map-route.component";
import { EquipmentService } from "@/services/equipment.service";
import { useEffect, useState } from "react";
import { EquipmentState } from "@/types/equipment.type";
import { InfoIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function EquipmentDetailsComponent() {
  const { selectedEquipment, isSheetOpen, closeSheet } = useEquipmentStore();

  const [states, setStates] = useState<EquipmentState[]>([]);
  const [earningsAndHours, setEarningsAndHours] = useState<ICalculateEarnings>({
    totalEarnings: 0,
    hoursWorked: 0,
    hoursMaintenance: 0,
    hoursIdle: 0,
    prices: {
      workingPrice: 0,
      stopPrice: 0,
      maintenancePrice: 0,
    },
  });

  useEffect(() => {
    getStates();
    getEarnings();
  }, [selectedEquipment]);

  async function getStates() {
    const states = await EquipmentService.getEquipmentStates();
    setStates(states);
  }

  async function getEarnings() {
    const earnings = await calculateEquipmentEarnings(
      selectedEquipment?.equipmentModel,
      selectedEquipment?.stateHistory,
      states,
    );

    setEarningsAndHours(earnings);
  }

  function getProductivePercentage(): string {
    const total =
      earningsAndHours.hoursWorked +
      earningsAndHours.hoursMaintenance +
      earningsAndHours.hoursIdle;

    const percentage = (earningsAndHours.hoursWorked / total) * 100;

    return `~${percentage.toFixed(2)}%`;
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <SheetContent side={"right"} className="z-50 bg-white min-w-[90vw]">
        {selectedEquipment && (
          <div className="flex flex-col items-center justify-center mt-5">
            <div className="flex flex-row items-center justify-between w-full border-b-2 border-b-neutral-300 pb-3">
              <div className="flex flex-col items-start justify-start w-full text-sm gap-2">
                <div className="w-full flex items-center gap-3">
                  <p>
                    <strong>Nome:</strong> {selectedEquipment.name}
                  </p>
                  <p>
                    <strong>Modelo:</strong>{" "}
                    {selectedEquipment.equipmentModel?.name}
                  </p>
                  <span className="flex flex-row items-center gap-3">
                    <strong>Estado atual:</strong>{" "}
                    <StatusBadge
                      text={selectedEquipment.state.name ?? ""}
                      color={selectedEquipment.state.color ?? "#dedede"}
                    />
                  </span>
                </div>
                <div className="w-full flex items-center gap-3">
                  <p>
                    <strong>Ganho: </strong> R${" "}
                    {earningsAndHours.totalEarnings.toFixed(2)}
                  </p>
                  <span className="flex items-center">
                    <p>
                      <strong>Produtividade: </strong>
                      {getProductivePercentage()}
                    </p>
                    <HoverCard>
                      <HoverCardTrigger
                        asChild
                        className="ml-1 hover:cursor-pointer"
                      >
                        <InfoIcon size={15} />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <p>
                          Porcentagem de produtividade baseada no total de horas
                          e horas trabalhadas
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </span>
                </div>
                <div className="w-full flex items-center gap-3">
                  <p>
                    <strong className="mr-1">
                      Horas trabalhadas{" "}
                      <span className="text-xs">
                        (R$
                        {earningsAndHours.prices.workingPrice.toFixed(2)}):
                      </span>
                    </strong>
                    {earningsAndHours.hoursWorked}h
                  </p>
                  <p>
                    <strong className="mr-1">
                      Horas em manutenção
                      <span className="text-xs">
                        (R$
                        {earningsAndHours.prices.maintenancePrice.toFixed(2)}):
                      </span>
                    </strong>
                    {earningsAndHours.hoursMaintenance}h
                  </p>
                  <p>
                    <strong className="mr-1">
                      Horas paradas
                      <span className="text-xs">
                        (R$
                        {earningsAndHours.prices.stopPrice.toFixed(2)}):
                      </span>
                    </strong>
                    {earningsAndHours.hoursIdle}h
                  </p>
                </div>
              </div>
              <img
                src={
                  selectedEquipment.equipmentModel?.name == "Harvester"
                    ? "/icons/harvester.png"
                    : selectedEquipment.equipmentModel?.name ==
                        "Garra traçadora"
                      ? "/icons/garra-tracadora.png"
                      : "/icons/caminhao-de-carga.png"
                }
                alt="Equipment"
                className="w-24 h-24 -mt-2"
              />
            </div>

            <div className="grid grid-cols-3 w-full h-[68vh] space-x-2 mt-5">
              <div className="col-span-2 flex flex-col items-start gap-3 w-full ">
                <span className="font-bold">Rota</span>
                <div className="w-full h-[68vh]">
                  <MapRouteComponent
                    positionHistory={selectedEquipment.positionHistory}
                    model={
                      selectedEquipment.equipmentModel?.name ??
                      "Caminhão de carga"
                    }
                  />
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-start gap-3">
                <span className="font-bold">Histórico de estado</span>
                <div className="h-[68vh] w-full -mt-6">
                  <EquipmentHistory />
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
