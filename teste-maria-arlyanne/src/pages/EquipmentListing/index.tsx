import {
  Card,
  CardBody,
  Container,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdLocationPin, MdMenu } from "react-icons/md";
import { formatDate } from "../../util/formatDate";
import { useNavigate } from "react-router-dom";
export default function EquipmentListing() {

  const [listEquipaments, setListEquipaments] = useState<any[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState('inside');
  const [equipamentsModel, setEquipamentsModel] = useState<any[]>([]);
  
  const navigate = useNavigate();

  async function getEquipments() {
    const equipaments = await axios.get("http://localhost:3001/equipament"); // traz a lista de equipamentos
    const equipmentModel = await axios.get(
      "http://localhost:3001/equipamentModel"
    );
    let list: any[] = [];
    equipaments.data.forEach((e: any) => {
      let equipament = e;
      const equipModel = equipmentModel.data.find(
        (el: any) => el.id == e.equipmentModelId
      );
      equipament = {
        id: equipament.id,
        name: equipament.name,
        equipmentModel: {
          ...equipModel,
        },
      };

      list.push(equipament);
    });
    setListEquipaments(list);
  }

  async function stateHistory(id: string){
    const listStateHistory = await axios.get(`http://localhost:3001/equipmentStateHistory?equipmentId=${id}`)
    const equipmentState = await axios.get("http://localhost:3001/equipmentState")
    onOpen()
    let list:any[] = []
    listStateHistory.data[0].states.sort(
      (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).forEach((e: any) => {
        let stateHistory = e
        const state = equipmentState.data.find((e:any) => e.id == stateHistory.equipmentStateId)
        stateHistory = {
            ...stateHistory,
            ...state
        }
        list.push(stateHistory)
    })
    setEquipamentsModel(list)
}
  useEffect(() => {
    getEquipments();
  }, []);

  return (
    <>
      <Container maxW='container.lg'>
        <Heading as="h4" size="md" mb={10}>
          Listagem Equipamentos
        </Heading>
        <Card>
          <CardBody>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Equipamento</Th>
                    <Th>Modelo</Th>
                    <Th>Ação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listEquipaments?.map((e, index) => (
                    <Tr key={ index}>
                      <Td>{e.name}</Td>
                      <Td>{e.equipmentModel.name}</Td>
                      <Td>
                        <Tooltip label="Detalhe">
                          <IconButton
                            onClick={() => stateHistory(e.id)}
                            bg={"white"}
                            aria-label={"Detalhe"}
                            color={"teal"}
                            icon={<MdMenu />}
                            mr={2}
                          ></IconButton>
                        </Tooltip>
                        <Tooltip label="Posições">
                          <IconButton
                            onClick={() => navigate(`/equipamentpositions/${e.id}`)}
                            bg={"white"}
                            aria-label={"Posições"}
                            color={"teal"}
                            icon={<MdLocationPin />}
                            mr={2}
                          ></IconButton>
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Histórico de Estados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Estado</Th>
                    <Th>Data</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {equipamentsModel.length > 0 &&
                    equipamentsModel?.map((e, index) => (
                      <Tr key={index}>
                        <Td color={e.color}>{e.name}</Td>
                        <Td>{formatDate(new Date(e.date))}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
