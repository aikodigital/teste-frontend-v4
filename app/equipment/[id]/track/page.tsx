"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import equipmentDetails from "@/app/data/equipment.json";
import equipmentModels from "@/app/data/equipmentModel.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import equipmentPositionHistory from "@/app/data/equipmentPositionHistory.json";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Position, Vehicle } from "@/app/types/types";

const DynamicMap = dynamic(() => import("@/app/_components/map"), {
  ssr: false,
});

const TrackPage = () => {
  const router = useRouter();
  const { id: equipmentId } = useParams();

  useEffect(() => {
    if (equipmentId) {
      const stateHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === equipmentId
      );
    }
  }, [equipmentId]);

  const equipmentModel = equipmentModels.find(
    (model) =>
      model.id ===
      equipmentDetails.find((equipment) => equipment.id === equipmentId)
        ?.equipmentModelId
  );

  const equipment: Vehicle[] = [
    {
      id: equipmentId as string,
      name:
        equipmentDetails.find((equipment) => equipment.id === equipmentId)
          ?.name || "",
      equipmentModelId: equipmentModel?.id || "",
    },
  ];

  const equipmentPositions = equipmentPositionHistory.filter((history) => {
    return history.equipmentId === (equipmentId as string);
  });

  return (
    <div>
      <div className="relative w-full flex items-center py-5 justify-center bg-gray-200 border-b z-50">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="absolute p-0 left-0 ml-2"
        >
          <ChevronLeftIcon size={30} />
        </Button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold">
            Histórico de localização e estados
          </h1>
          <span>
            {
              equipmentDetails.find((equipment) => equipment.id === equipmentId)
                ?.name
            }
          </span>
        </div>
      </div>
      <section className="h-[100vh] w-[100vw] flex">
        <div className="z-10 w-full">
          <DynamicMap
            equipment={equipment}
            equipmentPositionHistory={
              equipmentPositions as {
                equipmentId: string;
                positions: Position[];
              }[]
            }
            equipmentModel={equipmentModels}
            equipmentStateHistory={equipmentStateHistory}
            showModal={false}
            polyline={true}
          />
        </div>
      </section>
    </div>
  );
};

export default TrackPage;
