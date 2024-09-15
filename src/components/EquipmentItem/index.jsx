import { useSelector } from "react-redux"
import { ListItem, History } from "./style"
import { useState } from "react"


const EquipmentItem = ({id, name, model, lastState, newStateHistory}) => {


    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(!open)
    }

    return(
        <ListItem
            data-eq-id={id}
            onClick={e => console.log(e.currentTarget.getAttribute('data-eq-id'))}
            key={id}
        
        >
            <div className="list-item-wrapper">

                <div className="eq-infos">
                    <p className="list-name">{name}</p>
                    <p className="list-model">{model}</p>
                    <p className="list-status" style={{ backgroundColor: lastState.color}}>{lastState.name}</p>
                </div>


                <button onClick={toggleOpen}>Ver histórico</button>
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