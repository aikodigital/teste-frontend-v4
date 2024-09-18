
import { useDispatch } from "react-redux"
import { useState } from "react"
import { focusEquipment } from '../../store/reducers/equipments'

import { ListItem, History } from "./style"


const EquipmentItem = ({id, name, model, lastState, newStateHistory}) => {


    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)



    const focusId = (id) => {
        dispatch(
            focusEquipment(id)
        )
    }

    const toggleOpen = () => {
        setOpen(!open)
    }
    

    return(
        <ListItem
            key={id}
        >
            <div className="list-item-wrapper">

                <div className="eq-infos">
                    <p
                        className="list-name"
                        data-eq-id={id}
                        onClick={e => focusId(e.currentTarget.getAttribute('data-eq-id'))}
                    >{name}</p>
                    <p className="list-model">{model}</p>
                    <p className="list-status" style={{ backgroundColor: lastState.color}}>{lastState.name}</p>
                </div>

                <div className="btns">
                    <button
                        data-eq-id={id}
                        onClick={e => focusId(e.currentTarget.getAttribute('data-eq-id'))}
                    >Ver no mapa</button>

                    <button onClick={toggleOpen}>Ver histórico</button>
                    
                </div>

            </div>

            {open && (
                <History>

                    <ul>

                        {newStateHistory.map((item) => (
                            <li>
                                <p>{item.date}</p>
                                <p style={{backgroundColor: item.state.color, padding:'4px', borderRadius:'4px'}}>{item.state.name}</p>
                            </li>
                        ))}
                    
                    </ul>

                </History>
            )}
        
        </ListItem>
    )
}

export default EquipmentItem