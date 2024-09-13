import { Box, Input, Select } from "@chakra-ui/react"

export const Filters = () => {
    return (
        <Box display='flex' p={4} gap={4}>
            <Input placeholder="Pesquisar" />

            <Select placeholder="Selecione um Estado">
                <option>Operando</option>
                <option>Parado</option>
                <option>Manutenção</option>
            </Select>

            <Select placeholder="Selecione um Modelo">
                <option>Caminhão de Carga</option>
                <option>Harverster</option>
                <option>Garra Traçadora</option>
            </Select>
        </Box>
    )
}