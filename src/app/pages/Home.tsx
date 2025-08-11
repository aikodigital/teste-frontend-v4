import { useEffect, useState } from "react";

import { DataTable, DataTableColumn } from "@/components/Table";
import { TableRow, TableCell } from "@/components/Table/Table";
import { Tag } from "@/components/Tag";
import { H1, H2 } from "@/components/Heading";
import { useEquipmentStore } from "@/lib/store";

interface Equipment {
    id: string,
    name: string,
    state: string,
    stateColor: string,
    model: string,
    position?: {
        lat: number,
        lng: number
    }
}

export default function HomePage() {
    const { states, stateHistory, equipments, models, positionHistory } = useEquipmentStore();

    const [equimentData, setEquipmentData] = useState<Equipment[]>([]);

    useEffect(() => {
        setEquipmentData(
            equipments.map((equipment) => {
                const stateHistoryItem = stateHistory.find((history) => history.equipmentId === equipment.id);
                const state = stateHistoryItem?.states[stateHistoryItem.states.length - 1];
                const stateData = states.find((s) => s.id === state?.stateId);
                const model = models.find((model) => model.id === equipment.equipmentModelId);
                const positionHistoryItem = positionHistory.find((history) => history.equipmentId === equipment.id);
                const position = positionHistoryItem?.positions[positionHistoryItem.positions.length - 1];

                return {
                    id: equipment.id,
                    name: equipment.name,
                    state: stateData?.name || "",
                    stateColor: stateData?.color || "",
                    model: model?.name || "",
                    position: position ? {
                        lat: position.lat,
                        lng: position.lon
                    } : undefined
                };
            })
        );
    }, [states, models, equipments, positionHistory, stateHistory]);

    const columns: DataTableColumn<Equipment>[] = [
        {
            header: "Nome",
            accessorKey: "name",
        }, {
            header: "Estado atual",
            accessorKey: "state",
            cell: (equipment) => (
                <Tag color={equipment.stateColor}>
                    {equipment.state}
                </Tag>
            )
        }, {
            header: "Modelo",
            accessorKey: "model",
        }, {
            header: "Posição atual",
            accessorKey: "position",
            cell: (equipment) => (
                <div>
                    {equipment.position ? (
                        <span>{`Lat: ${equipment.position.lat.toFixed(2)}, Lng: ${equipment.position.lng.toFixed(2)}`}</span>
                    ) : (
                        <span>Sem posição</span>
                    )}
                </div>
            )
        }
    ];

    const tableFooter = (
        <TableRow>
            <TableCell colSpan={6} className="text-right">
                Total de equipamentos: {equimentData.length}
            </TableCell>
        </TableRow>
    );

    return (
        <div className="flex-1 flex flex-col gap-4 overflow-auto p-4">
            <H1>Início</H1>
            <div className="flex-1 flex flex-col gap-4">
                <H2>Lista de equipamentos</H2>
                <DataTable
                    data={equimentData}
                    columns={columns}
                    caption={"Lista de equipamentos"}
                    footer={tableFooter}
                />
            </div>
        </div>
    );
}