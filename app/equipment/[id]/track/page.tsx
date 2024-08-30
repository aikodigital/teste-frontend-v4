"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import equipmentDetails from "@/app/data/equipment.json";
import equipmentModels from "@/app/data/equipmentModel.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import equipmentPositionHistory from "@/app/data/equipmentPositionHistory.json";
import equipmentStates from "@/app/data/equipmentState.json";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Position, Vehicle } from "@/app/types/types";
import { formatDateTime } from "@/app/_utils/time-format";

const DynamicMap = dynamic(() => import("@/app/_components/map"), {
  ssr: false,
});

const TrackPage = () => {
  const router = useRouter();
  const { id: equipmentId } = useParams();

  const [stateHistory, setStateHistory] = useState<
    { date: string; stateName: string; color: string }[]
  >([]);

  useEffect(() => {
    if (equipmentId) {
      const history = equipmentStateHistory.find(
        (history) => history.equipmentId === equipmentId
      );

      if (history) {
        const statesWithNames = history.states
          .map((stateRecord) => {
            const state = equipmentStates.find(
              (s) => s.id === stateRecord.equipmentStateId
            );
            return state
              ? {
                  date: stateRecord.date,
                  stateName: state.name,
                  color: state.color,
                }
              : null;
          })
          .filter(Boolean) as {
          date: string;
          stateName: string;
          color: string;
        }[];

        setStateHistory(
          statesWithNames.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
      }
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
      <div className="relative w-full flex items-center py-5 justify-center bg-gray-200 border-b z-50 md:top-0">
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
      <section className="h-[100vh] w-[100vw] flex flex-col lg:flex-row">
        <div className="w-fit max-w-[40%] max-md:hidden h-full overflow-y-auto p-5">
          <h2 className="text-lg font-semibold mb-4">Histórico de Estados</h2>
          <div className="relative">
            <div className="absolute h-full w-[2px] bg-gray-300 left-4"></div>
            <ul className="space-y-5">
              {stateHistory.map((state, index) => (
                <li
                  key={index}
                  className="relative flex items-center space-y-2"
                >
                  <div
                    className={`p-4 rounded-full bg-${state.color}`}
                    style={{ backgroundColor: state.color }}
                  ></div>
                  <div className="lg:pl-8">
                    <span className="block text-sm font-semibold">
                      {state.stateName}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {formatDateTime(state.date).day +
                        " às " +
                        formatDateTime(state.date).time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-background w-full max-h-[30%] md:hidden p-5 fixed bottom-0 z-50">
          <h2 className="text-lg font-semibold mb-4">Histórico de Estados</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {stateHistory.map((state, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div
                  className={`p-4 rounded-full bg-${state.color}`}
                  style={{ backgroundColor: state.color }}
                ></div>
                <span className="block text-xs text-gray-500">
                  {formatDateTime(state.date).day +
                    " às " +
                    formatDateTime(state.date).time}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full">
          <Suspense fallback="Carregando...">
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
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default TrackPage;
