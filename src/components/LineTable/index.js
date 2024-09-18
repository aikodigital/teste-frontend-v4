import { EquipamentContext } from '../../Hooks/EquipementContext';
import { useContext } from "react";
import "./style.css";

const LineTable = ({id,modality_id,name})=>{

    const { 
        setEquipamentSelected,
        findDataEquipament,
        setCoodinateSelected,
        setDataEquipamentSelected,
        setStateModal } = useContext(EquipamentContext);

    const data = findDataEquipament({
        id:id,
        equipamentID:modality_id
      })
    return(
        <>
        <tr onClick={()=>{
            setEquipamentSelected({id:id, equipamentID:modality_id})
            setCoodinateSelected([data.positionHistory.positions[0].lat,data.positionHistory.positions[0].lon])
            setStateModal(true)
            setDataEquipamentSelected(data)
          }}>
          <td>{data.Model.name} - { name }</td>
          <td >{id}</td>
          <td>{modality_id}</td>
        </tr>
        </>
    )
}

export default LineTable;