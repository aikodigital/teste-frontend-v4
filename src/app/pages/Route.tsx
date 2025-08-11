import { FilterButton } from "@/components/FilterButton";
import { H1 } from "@/components/Heading";
import RouteMap from "@/components/Map/RouteMap";
import { useEquipmentStore, useFilterStore } from "@/lib/store";

export default function RoutePage() {
    const { equipmentId, setEquipmentId } = useFilterStore();

    const { equipments } = useEquipmentStore();

    return (
        <div className="flex-1 flex flex-col gap-4 overflow-auto p-4">
            <div className="flex items-center justify-between gap-2">
                <H1>Trajeto</H1>
                <div className="flex gap-1 overflow-auto">
                    {
                        equipments.map((equipment) => (
                            <FilterButton
                                key={equipment.id}
                                isSelected={equipmentId === equipment.id}
                                onClick={() => setEquipmentId(equipment.id)}
                            >
                                {equipment.name}
                            </FilterButton>
                        ))
                    }
                </div>
            </div>
            <div className="flex-1 min-h-48 md:min-h-64 lg:min-h-96 max-w-screen overflow-hidden rounded-2xl text-black">
                <RouteMap />
            </div>
        </div>
    );
}