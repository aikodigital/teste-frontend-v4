import { Card, CardBody, Container, Heading } from "@chakra-ui/react";
import Map from "../../components/Map";
import axios from "axios";
import { useEffect, useState } from "react";
import { Position } from "../../model/position.model";

export default function EquipmentLocation() {
  const [positions, setPositions] = useState<any[]>([]);

  async function getPositions() {
    const equipmentPositionHistory = await axios.get(
      "http://localhost:3001/equipmentPositionHistory"
    ); // Traz o historico de equipamentos
    const equipaments = await axios.get("http://localhost:3001/equipament") // traz a lista de equipamentos
    const equipamentStateHistory = await axios.get("http://localhost:3001/equipmentStateHistory") // Traz a lista de eq. com seu historico
    const equipmentState = await axios.get("http://localhost:3001/equipmentState") // Traz a lista de estados de equipamentos
    const equipmentModel = await axios.get("http://localhost:3001/equipamentModel")
    let listPositions: Position[] = [];
  
    equipmentPositionHistory.data.forEach((e: any) => {
      let equipament = equipaments.data.find((el: any) => el.id == e.equipmentId)
      const equipModel = equipmentModel.data.find((el:any) => el.id == equipament.equipmentModelId)
      equipament = {
        id: equipament.id,
        name: equipament.name,
        equipmentModel: {
          ...equipModel
        }
      }
      let equipStateHistory = equipamentStateHistory.data.find((el:any) => el.equipmentId == e.equipmentId) 
      equipStateHistory.states.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach((stateHistory:any, index:number) => {
        const state = equipmentState.data.find((el:any) => el.id == stateHistory.equipmentStateId)
        equipStateHistory.states[index] = Object.assign( equipStateHistory.states[index], state)
      })
      const p = e.positions.sort(
        (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      listPositions.push(Object.assign(p[0], equipament, equipStateHistory) );
    });
    setPositions(listPositions);
    console.log(listPositions)
  }

  useEffect(() => {
    getPositions();
  }, []);

  return (
    <Container maxW={"container.lg"}>
      <Heading as="h4" size="md" mb={5}>
        Localização de Equipamentos Recentes
        </Heading>
      {positions.length > 0 ? (
        <Card>
          <CardBody>
            <Map data={positions} />
          </CardBody>
        </Card>
        
      ) : (
        <p>Carregando posições...</p>
      )}
      
    </Container>
  );
}
