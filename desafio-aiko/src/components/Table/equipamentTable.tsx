import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Table,
  Collapsible,
  Text,
  VStack,
  Select,
  Portal,
  createListCollection,
  ListItemProps
} from "@chakra-ui/react"
import { useState } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { EquipmentFullData } from "@/interface/types"
import { EquipmentMap } from "../Map"
import { CustomModal } from "../Modal"

interface EquipmentTableProps {
  data: EquipmentFullData[]
}

export const EquipmentTable = ({ data }: EquipmentTableProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentFullData | null>(null)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [stateFilter, setStateFilter] = useState<ListItemProps | null>(null)
  const [nameFilter, setNameFilter] = useState("")

  const openMapModal = (equipment: EquipmentFullData) => {
    setSelectedEquipment(equipment)
    setIsMapModalOpen(true)
  }

  const closeMapModal = () => {
    setIsMapModalOpen(false)
    setSelectedEquipment(null)
  }



  const uniqueStates = Array.from(new Set(data.map(item => item.stateName)))

  const filteredData = data.filter((item) => {
    const matchState = stateFilter ? item.stateName === stateFilter.value : true
    const matchName = nameFilter ? item.name.toLowerCase().includes(nameFilter.toLowerCase()) : true
    return matchState && matchName
  })




  const stateOptions = createListCollection({
    items: [
      { label: "Todos", value: "" },
      ...uniqueStates.map(state => ({
        label: state,
        value: state,
      })),
    ],
  })



  return (
    <Center minH="100vh" bg="gray.50" p={4}>
      <VStack spacing={6} w="100%" maxW="1000px">
        <Box w="100%">
          <Collapsible.Root>
            <Flex
              gap={4}
              mb={4}
              wrap="wrap"
              align="center"
              direction={{ base: "column", md: "row" }}
            >
              <Box flex="1" minW="200px">
                <Text mb={1}>Filtrar por Estado</Text>
                <Select.Root
                  collection={stateOptions}
                  size="sm"
                  width="320px"
                  onValueChange={(details) => {
                    const selectedValue = details.value[0]
                    if (!selectedValue) {
                      setStateFilter(null)
                      return
                    }

                    const selectedItem = stateOptions.items.find((item) => item.value === selectedValue) || null
                    setStateFilter(selectedItem)
                  }}

                >
                  <Select.HiddenSelect />
                  <Select.Control
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    _hover={{ borderColor: "gray.300" }}
                    _focusWithin={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                  >
                    <Select.Trigger px={3} py={2}>
                      <Select.ValueText placeholder="Selecione um estado" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content bg="white" borderRadius="md" boxShadow="md" zIndex={10}>
                        {stateOptions.items.map((item) => (
                          <Select.Item item={item} key={item.value} px={3} py={2} _hover={{ bg: "gray.100" }}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Box>


              <Box flex="1" minW="200px">
                <Text mb={1}>Filtrar por Nome</Text>
                <Input
                  placeholder="Digite o nome do equipamento"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </Box>
            </Flex>
          </Collapsible.Root>
        </Box>

        <Box w="100%" bg="white" boxShadow="md" borderRadius="md" p={6}>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Equipamento</Table.ColumnHeader>
                <Table.ColumnHeader>Estado</Table.ColumnHeader>
                <Table.ColumnHeader>Posição</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    <Flex align="center" gap={2}>
                      <Box
                        w="10px"
                        h="10px"
                        borderRadius="full"
                        bg={item.stateColor}
                      />
                      <Text>{item.stateName}</Text>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Button size="sm" onClick={() => openMapModal(item)} bg={'blue'} color="white">
                      <FaMapMarkerAlt /> Abrir mapa
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        {selectedEquipment && (
          <CustomModal
            size="90vw"
            isOpen={isMapModalOpen}
            onClose={closeMapModal}
            title={`Localização do equipamento: ${selectedEquipment?.name}`}
          >
            <EquipmentMap data={[selectedEquipment]} onClickMarker={() => { }} />
          </CustomModal>
        )}
      </VStack>
    </Center>
  )
}
