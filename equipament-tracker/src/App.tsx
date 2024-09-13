import { ChakraProvider } from "@chakra-ui/react"
import { Map } from "./components/Map"
import { DrawerProvider } from "./components/HistoryDrawer"
import { Filters } from "./components/Filters"

function App() {
    return (
        <ChakraProvider>
            <DrawerProvider>
                <Filters />
                <Map />
            </DrawerProvider>
        </ChakraProvider>
    )
}

export default App
