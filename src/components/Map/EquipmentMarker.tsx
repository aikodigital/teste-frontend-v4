import clsx from "clsx";
import { Question } from "react-bootstrap-icons";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface EquipmentMarkerProps {
    position: google.maps.LatLngLiteral;
    model?: "harvester" | "tractor" | "truck";
    onClick?: () => void;
}

export default function EquipmentMarker({ position, model, onClick }: EquipmentMarkerProps) {
    return (
        <AdvancedMarker position={position} anchorPoint={["50%", "50%"]} onClick={onClick}>
            <div
                className={clsx(`
                    flex flex-col items-center justify-center
                    w-12 h-12 p-3
                    rounded-full
                    transition duration-200
                `, model === "harvester" && "bg-green-600 hover:bg-green-700",
                    model === "tractor" && "bg-yellow-600 hover:bg-yellow-700",
                    model === "truck" && "bg-red-600 hover:bg-red-700",
                    model === undefined && "bg-blue-600 hover:bg-blue-700")}
            >
                {model === "harvester" && <img src="/harvester.svg" alt="icon" className="h-full w-full" />}
                {model === "tractor" && <img src="/claw.svg" alt="icon" className="h-full w-full" />}
                {model === "truck" && <img src="/truck.svg" alt="icon" className="h-full w-full" />}
                {model === undefined && <Question size={22} />}
            </div>
        </AdvancedMarker>
    );
}