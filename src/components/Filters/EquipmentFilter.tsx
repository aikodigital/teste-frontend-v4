import { handleFilters } from '../../commom/handleFilters';
import Equipement from '../../data/equipment.json';

interface Props {
    setSelectedFilters: React.Dispatch<React.SetStateAction<String[]>>,
    selectedFilters: String[]
}

export default function EquipmentFilter({ selectedFilters, setSelectedFilters }: Props) {
    return (
        <div className="col">
            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButtonMaquina"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="outside"
                >
                    Equipamentos
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonMaquina">
                    {Equipement.map(equipment => {
                        return (
                            <li
                                key={'equipmentFilter_' + equipment.id}
                                className="dropdown-item"
                            >
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id={'equipmentInputFilter_' + equipment.id}
                                    onChange={() => handleFilters(selectedFilters, setSelectedFilters, equipment.id)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={'equipmentInputFilter_' + equipment.id}
                                >
                                    {equipment.name}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
