import { Card, CardBody, Container, Heading, list, Text } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Position } from "../../../model/position.model";
import Map from "../../../components/Map";
import { EquipamentModel } from '../../../model/equipamentModel';

export default function EquipamentPositions() {
    const { id } = useParams();
    const [position, setPosition] = useState<Array<Position>>([]);
    const [equipament, setEquipment] = useState<any>();

    async function equipamentPosition() {
      const equipamentResp = await axios.get(`http://localhost:3001/equipament/${id}`)
      const equipamentModel = await axios.get(`http://localhost:3001/equipamentModel/${equipamentResp.data.equipmentModelId}`)

      const listStateHistory = await axios.get(`http://localhost:3001/equipmentStateHistory?equipmentId=${id}`)
      const equipmentPositionHistory = await axios.get(`http://localhost:3001/equipmentPositionHistory?equipmentId=${id}`)
      const states = await axios.get(`http://localhost:3001/equipmentState  `)

      let equipament = {
        ...equipamentResp.data,
        equipamentModel: {
          ...equipamentModel.data
        }
      }

      setEquipment(equipament)

      let list: any[] = []

      listStateHistory.data[0].states.forEach((el: any) => {
        const position = equipmentPositionHistory.data[0].positions.find((e:any) => e.date == el.date)
        const state = states.data.find((e:any) => el.equipmentStateId == e.id)
        if(position!= undefined)list.push(Object.assign(el,position, {states: [state]}))
      });


      setPosition(list)
  }
    
    
    useEffect(() => {
      equipamentPosition()
    }, [])
    
    return (
        <Container maxW={"container.lg"}>
        <Heading as="h4" size="md" mb={5}>
          Posições de Equipamento 
          </Heading>
          <Card>
            <CardBody>
              <Text mb={5}> {equipament?.name} - {equipament?.equipamentModel?.name}</Text>
              <Map data={position} />
            </CardBody>
          </Card>
        
      </Container>
    )
}