import { useContextData } from '../../context/context';
import { FormBody } from './styles/styles';
import equipmentModel from '../../data/equipmentModel.json';
import { ContextData } from '../../interfaces/interfaces';
import { EquipmentModel } from '../../interfaces/interfaces';

export default function Form() {
    const {
        selectedState,
        setSelectedState,
        selectedModel,
        setSelectedModel,
        setSearchTag,
        searchTag,
    } = useContextData() as ContextData;

    return (
        <FormBody>
            <div>
                <select
                    onChange={(e) => setSelectedState(e.target.value || null)}
                    value={selectedState || ''}
                >
                    <option value="">Todos os Estados</option>
                    <option value="Operando">Operando</option>
                    <option value="Manutenção">Manutenção</option>
                </select>
                
                <div className="input-group">
                    <label htmlFor="searchTag">Digite o modelo</label>
                    <input
                        type="text"
                        id="searchTag"
                        placeholder="CA-0001"
                        value={searchTag ?? ''}
                        onChange={(e) => setSearchTag(e.target.value || null)}
                    />
                </div>

                <select
                    onChange={(e) => setSelectedModel(e.target.value || null)}
                    value={selectedModel || ''}
                >
                    <option value="">Todos os Modelos</option>
                    {equipmentModel.map((model: EquipmentModel) => (
                        <option key={model.id} value={model.name}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>
        </FormBody>
    );
}
