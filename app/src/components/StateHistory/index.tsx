import React, { useMemo } from "react";
import { AggregatedEquipment } from "@/helpers/types";
import { StateTimeline } from "../StateTimeline";
import { formatMoney } from "@/helpers/formatters";

interface Props {
  data: AggregatedEquipment
  handleClose: () => void
}

export function StateHistory({ data, handleClose }: Props) {
  const orderedStateHistory = useMemo(() => {
    return data.stateHistory?.toReversed()
  }, [data?.stateHistory])

  const details = [
    { label: 'Produtividade', value: `${data.productivityPercentage}%` },
    { label: 'Ganho', value: formatMoney(data.equipmentGain) },
  ]

  return (
    <aside className="w-96 h-[calc(100vh-65px)] border-l">
      <div className="w-full flex justify-between px-6 mt-4">
        <div>
          <h1 className="font-bold text-xl">{data.name} ({data.model?.name})</h1>
          {details.map(item => (
            <p className="text-xs text-gray-500" key={item.label}>{item.label}: {item.value}</p>
          ))}
          <h2 className="font-semibold text-base mt-2 text-gray-600">Histórico de estados</h2>
        </div>
        <button
          onClick={handleClose}
          aria-label="Fechar"
          title="Fechar"
          className="p-2 h-min rounded-full hover:bg-slate-100"
        >
          <svg width="16px" height="16px" viewBox="0 0 0.48 0.48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.38 0.1 0.1 0.38" stroke="#333333" strokeWidth="0.04" strokeLinecap="round" />
            <path d="m0.1 0.1 0.28 0.28" stroke="#333333" strokeWidth="0.04" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="h-[calc(100vh-173px)] overflow-y-auto p-4 pl-6">
        <StateTimeline data={orderedStateHistory} />
      </div>
    </aside>
  )
}
