import { InfoWindow } from "@vis.gl/react-google-maps";

import { useEquipmentStore } from "@/lib/store";
import { Tag } from "@/components/Tag";

interface EquipmentPopupProps {
    equipmentId: string | undefined;
    onCloseClick?: () => void;
    isOpen?: boolean;
}

export default function EquipmentPopup({ equipmentId, onCloseClick, isOpen }: EquipmentPopupProps) {
    const { equipments, positionHistory, models, states, stateHistory } = useEquipmentStore();

    const positions = positionHistory.find((position) => position.equipmentId === equipmentId);
    const position = positions?.positions[positions.positions.length - 1];
    const equipment = equipments.find((equipment) => equipment.id === equipmentId);
    const model = models.find((model) => model.id === equipment?.equipmentModelId);
    const equipmentStates = stateHistory.find((state) => state.equipmentId === equipmentId);
    const equipmentState = states.find((state) => state.id === equipmentStates?.states[equipmentStates.states.length - 1].stateId);

    if (isOpen && equipmentId && position) return (
        <InfoWindow position={{ lat: position.lat, lng: position.lon }} pixelOffset={[0, -15]} onCloseClick={onCloseClick}>
            <div
                className="
                    flex flex-col items-stretch gap-1
                    pb-1 px-1
                    rounded-xl
                    shadow-lg
                "
            >
                <h2 className="text-lg font-bold">{equipment?.name}</h2>
                <div className="border-b border-zinc-400" />
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-zinc-800">
                        {model?.name}
                    </p>
                    <p className="flex items-center gap-1 text-sm font-bold">
                        <span>Estado: </span>
                        <Tag color={equipmentState?.color}>
                            {equipmentState?.name}
                        </Tag>
                    </p>
                </div>
            </div>
        </InfoWindow>
    );
    else return (<></>);
}