import { Box, Switch, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Combobox } from "./Combobox";
import { getStates, getModels, getEquipment } from '../utils/filtersData';

export const Filters = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
    const [equipmentName, setEquipmentName] = useState("");
    const [state, setState] = useState("");
    const [model, setModel] = useState("");
    const [showTrajectory, setShowTrajectory] = useState(false);

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
            setEquipmentNameOptions(equipmentName);
        };

        loadOptions();
    }, []);

    useEffect(() => {
        onFilterChange({ equipmentName, state, model, showTrajectory });
    }, [equipmentName, state, model, showTrajectory]);

    return (
        <Box p={4} zIndex={1000} width="100%">
            <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={4}
                mb={4}
                flexWrap="wrap"
            >
                <Box flex="1" minWidth={{ base: "100%", md: "auto" }}>
                    <Combobox
                        placeholder="Pesquisar por nome"
                        options={equipmentNameOptions}
                        value={equipmentName}
                        onChange={setEquipmentName}
                    />
                </Box>

                <Box flex="1" minWidth={{ base: "100%", md: "auto" }}>
                    <Combobox
                        placeholder="Selecione um Estado"
                        options={stateOptions}
                        value={state}
                        onChange={setState}
                    />
                </Box>

                <Box flex="1" minWidth={{ base: "100%", md: "auto" }}>
                    <Combobox
                        placeholder="Selecione um Modelo"
                        options={modelOptions}
                        value={model}
                        onChange={setModel}
                    />
                </Box>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" gap={2} mt={4}>
                <Text>Mostrar Trajeto:</Text>
                <Switch
                    isChecked={showTrajectory}
                    onChange={(e) => setShowTrajectory(e.target.checked)}
                    isDisabled={!equipmentName}
                />
            </Box>
        </Box>
    );
};
