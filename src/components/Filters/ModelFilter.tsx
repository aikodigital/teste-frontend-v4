import { handleFilters } from '../../commom/handleFilters';
import EquipementModel from '../../data/equipmentModel.json';

interface Props {
    setSelectedFilters: React.Dispatch<React.SetStateAction<String[]>>,
    selectedFilters: String[]
}

export default function ModelFilter({ selectedFilters, setSelectedFilters }: Props) {
    return (
        <div className="col">
            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="outside"
                >
                    Modelos
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    {EquipementModel.map(model => {
                        return <li key={'modelFilter_' + model.id} className="dropdown-item">
                            <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={'modelInputFilter_' + model.id}
                                onChange={() => handleFilters(selectedFilters, setSelectedFilters, model.id)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={'modelInputFilter_' + model.id}>{model.name}
                            </label>
                        </li>
                    })}
                </ul>
            </div>
        </div >
    )
}
