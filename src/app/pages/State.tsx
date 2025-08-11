import { useEffect, useState } from "react";

import { StateMap } from "@/components/Map";
import { DataTable, DataTableColumn } from "@/components/Table";
import { TableRow, TableCell } from "@/components/Table/Table";
import { Tag } from "@/components/Tag";
import { FilterButton } from "@/components/FilterButton";
import { H1, H2 } from "@/components/Heading";
import { useEquipmentStore, useFilterStore } from "@/lib/store";

interface StateHistory {
    stateId: string,
    name: string,
    state: string,
    color: string,
    timestamp: string
}

export default function StatePage() {
    const { states, stateHistory, equipments, models } = useEquipmentStore();
    const { equipmentId, stateId, modelId, setStateId, setModelId } = useFilterStore();

    const selectedEquipment = equipments.find((equipment) => equipment.id === equipmentId);
    const selectedStateHistory = stateHistory.find((history) => history.equipmentId === equipmentId);

    const [stateHistoryData, setStateHistoryData] = useState<StateHistory[]>([]);

    const filteredStateHistory = stateHistoryData.filter((state) => {
        if (stateId) return state.stateId === stateId;
        return true;
    });

    useEffect(() => {
        setStateHistoryData(
            selectedStateHistory?.states.map((state) => {
                const equipment = equipments.find((equipment) => equipment.id === equipmentId);
                const stateData = states.find((s) => s.id === state.stateId);

                return {
                    stateId: state.stateId,
                    name: equipment?.name || "",
                    state: stateData?.name || "",
                    color: stateData?.color || "",
                    timestamp: state.date.toLocaleTimeString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })
                };
            }).reverse() || []
        )
    }, [selectedStateHistory, states, equipments, equipmentId]);

    const columns: DataTableColumn<StateHistory>[] = [
        {
            header: "Equipamento",
            accessorKey: "name",
        }, {
            header: "Estado",
            accessorKey: "state",
            cell: (state) => (
                <Tag color={state.color}>
                    {state.state}
                </Tag>
            )
        }, {
            header: "Data",
            accessorKey: "timestamp",
        }
    ];

    const tableFooter = (
        <TableRow>
            <TableCell colSpan={6} className="text-right">
                Total de estados: {filteredStateHistory.length}
            </TableCell>
        </TableRow>
    );

    return (
        <div className="flex-1 flex flex-col gap-4 overflow-auto p-4">
            <div className="flex items-center justify-between gap-2">
                <H1>Mapa</H1>
                <div className="flex gap-1 overflow-auto">
                    <FilterButton
                        key="all-models"
                        isSelected={modelId === undefined}
                        onClick={() => setModelId(undefined)}
                    >
                        Todos
                    </FilterButton>
                    {
                        models.map((model) => (
                            <FilterButton
                                key={model.id}
                                isSelected={modelId === model.id}
                                onClick={() => setModelId(model.id)}
                            >
                                {model.name}
                            </FilterButton>
                        ))
                    }
                </div>
            </div>
            <div className="flex-1 min-h-48 md:min-h-64 lg:min-h-96 max-w-screen overflow-hidden rounded-2xl text-black">
                <StateMap />
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                    <H2>Histórico de estado do equipamento</H2>
                    <div className="flex gap-1 overflow-auto">
                        <FilterButton
                            key="all-states"
                            isSelected={stateId === undefined}
                            onClick={() => setStateId(undefined)}
                        >
                            Todos
                        </FilterButton>
                        {
                            states.map((state) => (
                                <FilterButton
                                    key={state.id}
                                    isSelected={stateId === state.id}
                                    onClick={() => setStateId(state.id)}
                                >
                                    {state.name}
                                </FilterButton>
                            ))
                        }
                    </div>
                </div>
                <DataTable
                    data={filteredStateHistory}
                    columns={columns}
                    caption={selectedEquipment ? `Lista de histórico de estados do equipamento ${selectedEquipment?.name}` : "Nenhum equipamento selecionado"}
                    footer={tableFooter}
                />
            </div>
        </div>
    );
}