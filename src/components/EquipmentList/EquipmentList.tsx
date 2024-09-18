import { IEquipment } from "../../types/equipment";

interface Props {
    equipments: IEquipment[],
    setEquipmentHistory: React.Dispatch<React.SetStateAction<IEquipment | undefined>>
}

export default function EquipmentList({ equipments, setEquipmentHistory }: Props) {
    let index = 0;

    return (
        <div className="row my-3">
            <div className="col">
                <div className="card px-1">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Maquina</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipments.map((equipment) => {
                                index++
                                return (
                                    <tr
                                        key={'list' + equipment.id}
                                        data-bs-toggle="modal"
                                        data-bs-target="#equipmentHistory"
                                        onClick={() => setEquipmentHistory(equipment)}
                                    >
                                        <th scope="row">{index}</th>
                                        <td>{equipment.name}</td>
                                        <td>{equipment.modelName}</td>
                                        <td>{equipment.state?.name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
