import { useDispatch, useSelector } from "react-redux"
import { test } from "../../store/reducers/test"


const Sidebar = () => {

    const dispatch= useDispatch()
    const placeholder = useSelector((state)=> state.test)


    

    return(
        <div>
            <div className="search">
                <input type="text" onChange={(e) => dispatch(test(e.target.value))}></input>
            </div>
            <div className="filters"></div>
            <ul className="equipment-list">
                <li>
                    {placeholder}
                </li>
            </ul>
        </div>
    )
}

export default Sidebar