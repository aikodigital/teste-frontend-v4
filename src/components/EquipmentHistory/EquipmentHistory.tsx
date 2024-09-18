import { useEffect, useState } from "react";
import { IEquipment } from "../../types/equipment";
import EquipmentState from "../../data/equipmentState.json";
import EquipmentStateHistory from "../../data/equipmentStateHistory.json";
import { IEquipmentState } from "../../types/equipmentState";
import ProductivityCard from "./ProductivityCard";

interface Props {
    equipment: IEquipment | undefined
}

export default function EquipmentHistory({ equipment }: Props) {
    const [historyState, setHistoryState] = useState<IEquipmentState[]>([]);
    const stateTypes = EquipmentState;

    useEffect(() => {
        const stateHistory = EquipmentStateHistory.find(equip => equip.equipmentId === equipment?.id);
        const sortedStates = stateHistory?.states.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setHistoryState(sortedStates ?? []);

    }, [equipment])

    const getStateName = (id: string) => {
        const state = stateTypes.find(state => state.id === id);
        return state ? state.name : "Desconhecido";
    };

    const handleDate = (date: string) => {
        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'UTC'
        });

        return formattedDate;
    }

    function getClass(state: string): string {
        return state === '0808344c-454b-4c36-89e8-d7687e692d57' ?
            'table-success'
            : state === 'baff9783-84e8-4e01-874b-6fd743b875ad' ?
                'table-warning'
                : state === '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f' ?
                    'table-danger'
                    : ''
    }

    return (
        <div className="modal fade" id="equipmentHistory" tabIndex={-1} aria-labelledby="equipmentHistoryLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="equipmentHistoryLabel">{equipment?.name} - {equipment?.modelName}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <div className="row">
                                    <div className="col-12">
                                        <ProductivityCard historyState={historyState} equipment={equipment} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                <div className="card p-1">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Data</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                historyState.map(state => {
                                                    return (
                                                        <tr key={`${state.date}-historytable`} className={getClass(state.equipmentStateId)}>
                                                            <td>{handleDate(state.date)}</td>
                                                            <td>{getStateName(state.equipmentStateId)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

