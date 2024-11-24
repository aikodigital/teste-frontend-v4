import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEquipmentStore } from "@/stores/equipment.store";
import { EquipmentHistory } from "./equipment-history.component";

export function EquipmentDetailsComponent() {
  const { selectedEquipment, isSheetOpen, closeSheet } = useEquipmentStore();

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent side={"right"} className="z-50 bg-white">
        <SheetHeader>
          <SheetTitle>Detalhes do Equipamento</SheetTitle>
          <SheetDescription>Veja o histórico abaixo</SheetDescription>
        </SheetHeader>
        {selectedEquipment && (
          <div className="mt-10 flex flex-col items-start">
            <p>
              <strong>Nome:</strong> {selectedEquipment.name}
            </p>
            <p>
              <strong>Modelo:</strong> {selectedEquipment.model}
            </p>
            <p>
              <strong>Estado atual:</strong> {selectedEquipment.state.name}
            </p>

            <EquipmentHistory equipmentId={selectedEquipment.id} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
