import { handleFilters } from '../../commom/handleFilters';
import EsquipmentState from '../../data/equipmentState.json';

interface Props {
    setSelectedFilters: React.Dispatch<React.SetStateAction<String[]>>,
    selectedFilters: String[]
}

export default function StatusFilter({ selectedFilters, setSelectedFilters }: Props) {
    return (
        <div className="col">
            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButtonStatus"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="outside"
                >
                    Status
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonStatus">
                    {EsquipmentState.map(state => {
                        return <li key={'stateFilter_' + state.id} className="dropdown-item">
                            <input
                                className="form-check-input me-2"
                                type="checkbox"
                                id={'stateInputFilter_' + state.id}
                                onChange={() => handleFilters(selectedFilters, setSelectedFilters, state.id)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={'stateInputFilter_' + state.id}
                            >
                                {state.name}
                            </label>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}
