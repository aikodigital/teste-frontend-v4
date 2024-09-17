import { useDispatch, useSelector } from "react-redux"
import { test } from "../../store/reducers/test"
import { SidebarWrapper } from "./style"
import EquipmentItem from "../EquipmentItem"

import equipmentState from '../../data/equipmentState.json'
import equipmentModel from '../../data/equipmentModel.json'

import { filterStatus, filterModel, filterSearch } from "../../store/reducers/equipments"



const Sidebar = () => {

    const dispatch= useDispatch()

    const equipments = useSelector((state) => state.equipments.filtered)


    //separa de forma dinamica os diferentes nomes de STATUS em um array para mapeamento das options do filtro
    const statusOptions = ['Todos']
    equipmentState.forEach(item => {
        const name = item.name
        statusOptions.push(name)
    })

    //separa de forma dinamica os diferentes nomes de MODELOS em um array para mapeamento das options do filtro
    const modelOptions = ['Todos']
    equipmentModel.forEach(item => {
        const name = item.name
        modelOptions.push(name)
    })


    //funcoes para acionar os dispatch
    const handleStatusFilterChange = (x) => {
        dispatch(filterStatus(x))
    }

    const handleModelFilterChange = (x) => {
        dispatch(filterModel(x))
    }

    const handleSearchFilterChange = (x) => {
        dispatch(filterSearch(x))
    }




    return(
        <SidebarWrapper>


            <div className="filters">

                <div className="search">
                    <p>Buscar equipamento</p>
                    <input type="text" onChange={(e) => handleSearchFilterChange(e.target.value)}></input>
                </div>

                <div className="status-filter">
                    <label htmlFor="status">Filtrar por status: </label>
                    <select name="status" onChange={e => handleStatusFilterChange(e.target.value)}>
                        {statusOptions.map(x => (
                            <option value={x} key={x}>{x}</option>
                        ))}

                    </select>
                </div>

                <div className="model-filter">
                    <label htmlFor="model">Filtrar por modelo: </label>
                    <select name="model" onChange={e => handleModelFilterChange(e.target.value)}>

                        {modelOptions.map(x => (
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