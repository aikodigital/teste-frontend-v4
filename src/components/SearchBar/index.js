import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icon from '../../assets/aiko.png'
import { EquipamentContext } from "../../Hooks/EquipementContext";
import { useContext, useState } from "react";
function SearchNav() {
  const {
    findEquipmentById,
    equipaments
  } = useContext(EquipamentContext);
  console.log()
  const [id,setId] = useState("")
  return (
    <Navbar className="bg-body-tertiary justify-content-between">
            <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={icon}
      />
      <Form inline>
        <Row>
          <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="ID do Equipamento"
            className="mr-sm-2"
            onChange={(event) => setId(event.target.value)}
          />
          </Col>
          <Col xs="auto">
            <Button onClick={()=>{
              findEquipmentById(equipaments,id)
            }}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default SearchNav;