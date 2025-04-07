import './filtercontainer.css'
import { Eye, EyeClosed } from 'lucide-react'
import equipmentModel from '../../data/equipmentModel.json'
import equipmentState from '../../data/equipmentState.json'

interface FilterContainerProps {
    handleStateFilter: (stateId: string) => void;
    handleModelFilter: (modelId: string) => void;
    filter: { models: string[]; states: string[] } | null;
}

const FilterContainer: React.FC<FilterContainerProps> = ({ handleStateFilter, handleModelFilter, filter }) => {

    return (
        <div id="filter-container">
            <section>
                <h2>By model</h2>
                <div className="filter">
                    {
                        equipmentModel.map((model) => (
                            <button 
                                key={model.id} 
                                className="filter-option"
                                onClick={() => handleModelFilter(model.id)}
                            >
                                <span>
                                {
                                    filter?.models?.includes(model.id) ?
                                    <Eye />
                                    :
                                    <EyeClosed />
                                }
                                </span>
                                {model.name}
                            </button>
                        ))
                    }
                </div>
            </section>
            <section>
                <h2>By state</h2>
                <div className="filter">
                    {
                        equipmentState.map((state) => (
                            <button 
                                key={state.id} 
                                className="filter-option"
                                onClick={() => handleStateFilter(state.id)}
                            >
                                <span>
                                {
                                    filter?.states?.includes(state.id) ?
                                    <Eye />
                                    :
                                    <EyeClosed />
                                }
                                </span>
                                {state.name}
                            </button>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default FilterContainer