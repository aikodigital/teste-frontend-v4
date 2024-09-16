import { useDispatch, useSelector } from "react-redux"
import { test } from "../../store/reducers/test"
import { SidebarWrapper } from "./style"
import EquipmentItem from "../EquipmentItem"

import equipmentState from '../../data/equipmentState.json'
import { filterStatus } from "../../store/reducers/equipments"
import { useState } from "react"


const Sidebar = () => {

    const dispatch= useDispatch()

    const equipments = useSelector((state) => state.equipments.filtered)

    const [filter, setFilter] = useState('')


    //separa de forma dinamica os diferentes nomes de estados em um array para mapeamento das options do filtro
    const statusOptions = ['Todos']
    equipmentState.forEach(item => {
        const name = item.name
        statusOptions.push(name)
    })


    const handleFilterChange = (x) => {
        dispatch(filterStatus(x))
    }




    return(
        <SidebarWrapper>

            {/* <div className="search">
                <input type="text" onChange={(e) => dispatch(test(e.target.value))}></input>
            </div> */}

            <div className="filters">
                <div className="status-filter">
                    <label htmlFor="status">Filtrar por Status: </label>
                    <select name="status" onChange={e => handleFilterChange(e.target.value)}>

                        {statusOptions.map(x => (
                            <option value={x} key={x}>{x}</option>
                        ))}

                    </select>

                </div>
            </div>
            
            <ul className="equipment-list">

                {equipments.map(item=>(
                    <EquipmentItem
                        item={item}
                        id={item.id}
                        name={item.name}
                        model={item.model}
                        lastState={item.lastState}
                        newStateHistory={item.newStateHistory}
                        key={item.id}/>
                ))}

            </ul>

        </SidebarWrapper>
    )
}

export default Sidebar