import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEquipmentStore } from "@/stores/equipment.store";
import { EquipmentHistory } from "./equipment-history.component";
import { StatusBadge } from "./status-badge.component";
import { calculateEquipmentEarnings } from "@/utils/calculate-earnings";

export function EquipmentDetailsComponent() {
  const { selectedEquipment, isSheetOpen, closeSheet } = useEquipmentStore();

  const earningsAndHours = calculateEquipmentEarnings(
    selectedEquipment?.equipmentModel,
    selectedEquipment?.stateHistory,
  );

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent side={"right"} className="z-50 bg-white min-w-[40vw]">
        <SheetHeader>
          <SheetTitle>Detalhes</SheetTitle>
        </SheetHeader>
        {selectedEquipment && (
          <div className="flex flex-col items-center justify-center mt-5">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <p>
                  <strong>Nome:</strong> {selectedEquipment.name}
                </p>
                <p>
                  <strong>Modelo:</strong> {selectedEquipment.model}
                </p>
                <span className="flex flex-row items-center gap-3">
                  <strong>Estado atual:</strong>{" "}
                  <StatusBadge
                    text={selectedEquipment.state.name ?? ""}
                    color={selectedEquipment.state.color ?? "#dedede"}
                  />
                </span>
              </div>
              <img
                src={
                  selectedEquipment.model == "Harvester"
                    ? "/icons/harvester.png"
                    : selectedEquipment.model == "Garra traçadora"
                      ? "/icons/garra-tracadora.png"
                      : "/icons/caminhao-de-carga.png"
                }
                alt="Equipment"
                className="w-24 h-24 -mt-2"
              />
            </div>

            <div className="flex flex-row w-full items-center gap-3">
              <strong>Ganho</strong>
              {earningsAndHours.totalEarnings}

              {/* <strong>Horas trabalhadas</strong>
              {earningsAndHours.hoursWorked}

              <strong>Horas parado</strong>
              {earningsAndHours.hoursIdle}

              <strong>Horas em manutenção</strong>
              {earningsAndHours.hoursMaintenance} */}
            </div>

            <div className="h-[73vh] p-0 w-full">
              <EquipmentHistory />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
