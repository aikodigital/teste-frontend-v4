import { useDispatch, useSelector } from "react-redux"
import { test } from "../../store/reducers/test"
import { SidebarWrapper } from "./style"
import EquipmentItem from "../EquipmentItem"


const Sidebar = () => {

    const dispatch= useDispatch()
    const placeholder = useSelector((state)=> state.test)

    const equipments = useSelector((state) => state.equipments)
    console.log(equipments)

    

    return(
        <SidebarWrapper>

            {/* <div className="search">
                <input type="text" onChange={(e) => dispatch(test(e.target.value))}></input>
            </div>
            <div className="filters"></div> */}
            
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