import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Combobox } from "./Combobox"; // Importar o componente Combobox, se estiver em um arquivo separado
import { getStates, getModels, getEquipment } from '../utils/filtersData';

export const Filters = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
    const [equipmentName, setEquipmentName] = useState("");
    const [state, setState] = useState("");
    const [model, setModel] = useState("");

    const [stateOptions, setStateOptions] = useState<string[]>([]);
    const [modelOptions, setModelOptions] = useState<string[]>([]);
    const [equipmentNameOptions, setEquipmentNameOptions] = useState<string[]>([]);

    useEffect(() => {
        const loadOptions = async () => {
            const states = await getStates();
            const models = await getModels();
            const equipmentName = await getEquipment();

            setStateOptions(states);
            setModelOptions(models);
            setEquipmentNameOptions(equipmentName)
        };

        loadOptions();
    }, []);

    useEffect(() => {
        onFilterChange({ equipmentName, state, model });
    }, [equipmentName, state, model]);

    return (
        <Box display="flex" p={4} gap={4} zIndex={1000}>
            <Combobox
                placeholder="Pesquisar por nome"
                options={equipmentNameOptions}
                value={equipmentName}
                onChange={setEquipmentName}
            />

            <Combobox
                placeholder="Selecione um Estado"
                options={stateOptions}
                value={state}
                onChange={setState}
            />

            <Combobox
                placeholder="Selecione um Modelo"
                options={modelOptions}
                value={model}
                onChange={setModel}
            />
        </Box>
    );
};
