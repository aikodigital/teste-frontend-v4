import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Map } from "./components/Map";
import { DrawerProvider } from "./components/HistoryDrawer";
import { Filters } from "./components/Filters";

interface FiltersState {
    equipmentName: string;
    state: string;
    model: string;
    showTrajectory: boolean;
}

function App() {
    const [filters, setFilters] = useState<FiltersState>({
        equipmentName: "",
        state: "",
        model: "",
        showTrajectory: false
    });

    // Atualize o estado com base no filtro alterado
    const handleFilterChange = (newFilters: Partial<FiltersState>) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    return (
        <ChakraProvider>
            <DrawerProvider>
                <Filters onFilterChange={handleFilterChange} />
                <Map filters={filters} showTrajectory={filters.showTrajectory} />
            </DrawerProvider>
        </ChakraProvider>
    );
}

export default App;
