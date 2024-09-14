import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Map } from "./components/Map";
import { DrawerProvider } from "./components/HistoryDrawer";
import { Filters } from "./components/Filters";

function App() {
    const [filters, setFilters] = useState({ search: "", state: "", model: "" });

    return (
        <ChakraProvider>
            <DrawerProvider>
                <Filters onFilterChange={setFilters} />
                <Map filters={filters} />
            </DrawerProvider>
        </ChakraProvider>
    );
}

export default App;
