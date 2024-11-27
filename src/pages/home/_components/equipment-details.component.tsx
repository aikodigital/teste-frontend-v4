import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useEquipmentStore } from "@/stores/equipment.store";
import { EquipmentHistory } from "./equipment-history.component";
import { StatusBadge } from "./status-badge.component";
import { calculateEquipmentEarnings } from "@/utils/calculate-earnings";
import { MapRouteComponent } from "./map-route.component";

export function EquipmentDetailsComponent() {
  const { selectedEquipment, isSheetOpen, closeSheet } = useEquipmentStore();

  const earningsAndHours = calculateEquipmentEarnings(
    selectedEquipment?.equipmentModel,
    selectedEquipment?.stateHistory,
  );

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent side={"right"} className="z-50 bg-white min-w-[90vw]">
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
                <p>
                  <strong>Ganho</strong> R${" "}
                  {earningsAndHours.totalEarnings.toFixed(2)}
                </p>
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

            <div className="grid grid-cols-3 w-full h-[73vh] space-x-2 mt-5">
              <div className="col-span-2 flex flex-col items-start gap-3 w-full ">
                <span className="font-bold">Rota</span>
                <div className="w-full h-[70vh]">
                  <MapRouteComponent
                    positionHistory={selectedEquipment.positionHistory}
                    model={selectedEquipment.model ?? "Caminhão de carga"}
                  />
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-start gap-3">
                <span className="font-bold">Histórico de estado</span>
                <div className="h-[70vh] w-full -mt-6">
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
