"use client";

import { Equipment } from "@/@types";
import Map from "./map";
import { useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";

type EquipmentsSectionProps = {
  equipments: Equipment[];
};

export default function EquipmentsSection({
  equipments,
}: EquipmentsSectionProps) {
  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>();

  return (
    <section className="h-full w-full bg-[#001C48] flex gap-4 justify-center items-center py-10 px-5">
      <Map
        equipments={equipments}
        handleClickEquipment={setSelectedEquipment}
      />
      {selectedEquipment && (
        <div className="w-80 h-full bg-white rounded-md">
          <header className="w-full text-center p-1 border-b border-[#D6DEEB]">
            Histórico
          </header>
          <div className="flex flex-col h-[calc(100%-33px)]  overflow-y-auto p-3">
            {selectedEquipment.historyStates?.map((state) => (
              <div
                key={state.date}
                className="flex flex-col gap-1 text-sm p-1 border-b border-[#D6DEEB]"
              >
                <span>{moment(state.date).format("lll")}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: state.color }}
                  />
                  {state.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
