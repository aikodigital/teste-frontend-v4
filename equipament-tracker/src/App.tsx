import { ChakraProvider } from "@chakra-ui/react"
import { Map } from "./components/Map"
import { DrawerProvider } from "./components/HistoryDrawer"

function App() {
    return (
        <ChakraProvider>
            <DrawerProvider>
                <Map />
            </DrawerProvider>
        </ChakraProvider>
    )
}

export default App
