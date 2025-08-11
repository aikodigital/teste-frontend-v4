import { useState } from "react";
import { Map } from "@vis.gl/react-google-maps";

import { mapId } from "@/config/env";
import { useEquipmentStore, useFilterStore } from "@/lib/store";

import EquipmentMarker from "./EquipmentMarker";
import EquipmentPopup from "./EquipmentPopup";

export default function StateMap() {
    const [selectedEquipment, setSelectedEquipment] = useState<string | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const position = { lat: -19.126536, lng: -45.947756 };

    const { equipments, positionHistory, models } = useEquipmentStore();
    const { setEquipmentId, modelId } = useFilterStore();

    const setSelected = (equipmentId: string | undefined) => {
        setSelectedEquipment(equipmentId);
        setEquipmentId(equipmentId);
        if (equipmentId) setIsOpen(true);
        else setIsOpen(false);
    }

    return (
        <Map
            mapId={mapId}
            colorScheme='FOLLOW_SYSTEM'
            defaultZoom={10}
            defaultCenter={position}
            streetViewControl={false}
        >
            {
                positionHistory.filter((position) => {
                    const equipment = equipments.find((equipments) => equipments.id === position.equipmentId);
                    const equipmentModelId = models.find((model) => model.id === equipment?.equipmentModelId)?.id;

                    if (modelId && equipmentModelId) return equipmentModelId === modelId;
                    return true;
                })
                    .map((position, index) => {
                        const lastPosition = position.positions[position.positions.length - 1];
                        const convertedPosition = { lat: lastPosition.lat, lng: lastPosition.lon };
                        const equipment = equipments.find((equipments) => equipments.id === position.equipmentId);
                        const modelId = models.find((model) => model.id === equipment?.equipmentModelId)?.id;

                        return (
                            <EquipmentMarker
                                key={index}
                                position={convertedPosition}
                                onClick={() => setSelected(equipment?.id)}
                                model={
                                    modelId === "a4b0c114-acd8-4151-9449-7d12ab9bf40f" ? "harvester" :
                                        modelId === "9c3d009e-0d42-4a6e-9036-193e9bca3199" ? "tractor" :
                                            modelId === "a3540227-2f0e-4362-9517-92f41dabbfdf" ? "truck" : undefined
                                }
                            />
                        );
                    })
            }

            <EquipmentPopup isOpen={isOpen} onCloseClick={() => setSelected(undefined)} equipmentId={selectedEquipment} />
        </Map>
    );
}