"use client";

import { useRouter } from "next/navigation";
import equipmentDetails from "@/app/data/equipment.json";
import equipmentModels from "@/app/data/equipmentModel.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";
import equipmentStates from "@/app/data/equipmentState.json";
import { ChevronLeftIcon, EarthIcon, History } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_utils/format-currence";
import { Card, CardContent } from "@/app/_components/ui/card";
import EquipmentState from "@/app/_components/equipment-state";

interface EquipmentPageProps {
  params: {
    id: string;
  };
}

const EquipmentPage = ({ params }: EquipmentPageProps) => {
  const [equipment, setEquipment] = useState<
    (typeof equipmentDetails)[0] | null
  >(null);
  const [productivity, setProductivity] = useState<number>(0);
  const [earnings, setEarnings] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const equipmentFinded = equipmentDetails.find(
      (row) => row.id === params.id
    );

    if (equipmentFinded) {
      setEquipment(equipmentFinded);

      const model = equipmentModels.find(
        (model) => model.id === equipmentFinded.equipmentModelId
      );
      const stateHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === params.id
      );

      if (model && stateHistory) {
        calculateProductivityAndEarnings(
          model.hourlyEarnings,
          stateHistory.states
        );
      }
    }
  }, [params.id]);

  const calculateProductivityAndEarnings = (
    hourlyEarnings: { equipmentStateId: string; value: number }[],
    states: { date: string; equipmentStateId: string }[]
  ) => {
    let totalHours = 0;
    let productiveHours = 0;
    let totalEarnings = 0;

    if (states.length < 2) return;

    const sortedStates = states.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    for (let i = 0; i < sortedStates.length - 1; i++) {
      const start = new Date(sortedStates[i].date);
      const end = new Date(sortedStates[i + 1].date);
      const hours = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
      totalHours += hours;

      const state = equipmentStates.find(
        (s) => s.id === sortedStates[i].equipmentStateId
      );
      const earningsEntry = hourlyEarnings.find(
        (e) => e.equipmentStateId === sortedStates[i].equipmentStateId
      );

      if (state && state.name === "Operando") {
        productiveHours += hours;
      }

      if (earningsEntry) {
        totalEarnings += earningsEntry.value * hours;
      }
    }

    setProductivity(totalHours > 0 ? (productiveHours / totalHours) * 100 : 0);
    setEarnings(totalEarnings);
  };

  if (!equipment) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-white/40">
        <Image
          src="/aiko.png"
          className="animate-spin"
          alt="Loading"
          width={100}
          height={100}
        />
      </div>
    );
  }

  return (
    <section className="h-[100vh] w-[100vw] bg-slate-100 flex flex-col items-center">
      <div className="relative w-full flex items-center py-5 justify-center bg-gray-200 border-b">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="absolute p-0 left-0 ml-2"
        >
          <ChevronLeftIcon size={30} />
        </Button>
        <h1 className="text-xl font-semibold">{equipment.name}</h1>
      </div>
      <div className="mt-5 w-full lg:w-[80%]">
        <div className="mx-5 bg-white flex justify-between h-14 items-center border px-5">
          <p className="text-xs">
            <strong>ID do equipamento:</strong>
          </p>
          <p className="text-xs">{equipment.id}</p>
        </div>
        <Card className="mt-5 mx-5">
          <CardContent className="flex justify-between">
            <Link href={`/`} className="p-1 flex flex-col items-center">
              <EarthIcon size={30} />
              <span>Rastrear</span>
            </Link>
            <Link
              href={`/equipment/${equipment.id}/track`}
              className="p-1 flex flex-col items-center"
            >
              <History size={30} />
              <span>Histórico</span>
            </Link>
            <EquipmentState
              variant="icon"
              equipmentStateId={
                equipmentStateHistory
                  .find((history) => history.equipmentId === equipment.id)
                  ?.states.sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )[0].equipmentStateId || ""
              }
            />
          </CardContent>
        </Card>
      </div>
      <div className="px-5 mt-5 w-full lg:w-[80%]">
        <div className="bg-white flex justify-between h-14 items-center border px-5">
          <p className="text-xs">
            <strong>Modelo:</strong>
          </p>
          <p className="text-xs">
            {
              equipmentModels.find(
                (model) => model.id === equipment.equipmentModelId
              )?.name
            }
          </p>
        </div>
        <div className="bg-white flex justify-between h-14 items-center border px-5">
          <p className="text-xs">
            <strong>Produtividade:</strong>
          </p>
          <p className="text-xs">{productivity.toFixed(2)}%</p>
        </div>
        <div className="bg-white flex justify-between h-14 items-center border px-5">
          <p className="text-xs">
            <strong>Ganho total:</strong>
          </p>
          <p className="text-xs">{formatCurrency(earnings)}</p>
        </div>
      </div>
    </section>
  );
};

export default EquipmentPage;
