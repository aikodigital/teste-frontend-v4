import { BsFillHouseFill } from "react-icons/bs";
import { FaCaravan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar(){

    const navigate = useNavigate();

    return(
        <aside className="w-1/6 flex flex-col min-h-screen max-h-full bg-gray-950" >
                <section className="w-full h-16 flex border-b px-6 items-center border-gray-800" >
                    <div className="bg-white flex justify-center rounded-md items-center h-9 w-9" >
                        <img src="/aiko.png" alt="" className="w-8" />
                    </div>
                    <p className="text-md text-white font-medium ml-3" >Aiko</p>
                </section>
                <section className="w-full px-6 h-96" >
                    <ul className="w-full space-y-9 flex mt-5 flex-col h-auto" >
                        <li className="flex items-center cursor-pointer" onClick={()=>navigate("/")} >
                            <BsFillHouseFill className="text-gray-500 mr-3" size={25}  />
                            <p className="text-sm text-white font-light" >Home</p>
                        </li>
                        <li className="flex items-center" >
                            <FaCaravan className="text-gray-500 mr-3" size={25}  />
                            <p className="text-sm text-white font-light" >Equipments</p>
                        </li>
                    </ul>
                </section>
        </aside>
    )
}