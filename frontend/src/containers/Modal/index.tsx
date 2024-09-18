/* eslint-disable react/react-in-jsx-scope */
import { Dialog } from "primereact/dialog";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IEquipmentsData } from "../../interfaces";
import { useEffect, useState } from "react";

import equipmentState from "../../../../data/equipmentState.json";

interface ModalComponentProps {
    data: IEquipmentsData;
    openModal: boolean;
    onClose: () => void;
}

export function ModalComponent({ data, openModal, onClose }: ModalComponentProps) {
    const [modalOpen, setModalOpen] = useState(openModal);

    useEffect(() => {
        setModalOpen(openModal);
    }, [openModal]);


    const combinedHistory = () => {
        if (!data.positionHistory?.positions || !data.stateHistory?.states) {
            return [];
        }

        const positionMap = new Map(data.positionHistory.positions.map(p => [p.date, p]));
        const combined = data.stateHistory.states.map(state => {
            const position = positionMap.get(state.date);
            return {
                ...state,
                position,
                equipmentName: data.name,
                equipmentId: data.id
            };
        });

        return combined;
    };

    const combinedHistoryData = combinedHistory();

    const totalHours = 24; // Total de horas em um dia
    let productiveHours = 0;
    let earnings = 0;

    if (data.model && data.model.hourlyEarnings.length > 0) {
        data.model.hourlyEarnings.forEach((earning) => {
            const state = equipmentState.find(
                (es) => es.id === earning.equipmentStateId
            );

            // if (state && state.name === "Operando") {
            //     productiveHours += earning.value;
            // }
            if (state) {
                if (state.name === "Operando") {
                    productiveHours += earning.value; // Soma as horas produtivas
                    earnings += earning.value * 100; // Exemplo: 100 por hora em operação
                } else if (state.name === "Manutenção") {
                    earnings += earning.value * -20; // Exemplo: -20 por hora em manutenção
                }
            }
        });
    }

    const productivity =
        Number(totalHours) > 0 ? (productiveHours / totalHours) * 100 : 0;

    if (!data || !data.model) return null;

    return (
        data && (
            <Dialog
                header={`Histórico ${data.model?.name} (${data.name})`}
                style={{ width: "80rem", backgroundColor: "white" }}
                visible={modalOpen}
                onHide={onClose}
                closeOnEscape
            >
                <div>
                    <h3>Produtividade do Equipamento: {productivity.toFixed(2)}%</h3>
                    <h3>Ganho Total: R$ {earnings.toFixed(2)}</h3>
                    <br />
                    <h3>Histórico Combinado</h3>
                    {combinedHistoryData.length > 0 ? (
                        <DataTable value={combinedHistoryData} paginator rows={10}>
                            <Column field="equipmentId" header="ID do Equipamento" />
                            <Column field="equipmentName" header="Nome do Equipamento" />
                            <Column field="date" header="Data" />
                            <Column field="position.lat" header="Latitude" />
                            <Column field="position.lon" header="Longitude" />
                            <Column field="stateName" header="Estado" />
                            <Column
                                header="Cor"
                                body={(rowData: any) => (
                                    <span
                                        style={{
                                            backgroundColor: rowData.stateColor,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            color: 'white',
                                            display: 'inline-block'
                                        }}
                                    >
                                        &nbsp;
                                    </span>
                                )}
                            />
                        </DataTable>
                    ) : (
                        <p>Sem histórico combinado disponível</p>
                    )}
                </div>
            </Dialog>
        )
    );
}
