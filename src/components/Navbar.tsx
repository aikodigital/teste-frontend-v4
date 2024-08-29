import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline, IoMailOutline, IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function Navbar(){
    return(
        <nav className="w-full h-16 items-center justify-between bg-white flex px-6"  >
                    <section className="flex" >
                        <div className="w-80 bg-gray-50 h-10 flex px-3 rounded-md items-center" >
                            <IoSearchOutline className="text-gray-300" size={25} />
                            <p className="text-gray-400 ml-3 text-sm" >Search a equipment</p>
                        </div>
                        <div className="bg-gray-50 items-center w-44 ml-3 rounded-md h-10 flex justify-between px-3" >
                            <FaCalendarAlt size={20} />
                            <p className="text-gray-400 text-xs" >Fri, 30 aug 2024</p>
                            <IoIosArrowDown size={17} />
                        </div>
                    </section>
                    <section className="flex items-center" >
                        <ul className="flex flex-row space-x-7" >
                            <li className="flex relative" >
                                <IoMailOutline size={25} className="text-gray-300" />
                                <span className="h-3 absolute w-3 left-4 bg-orange-600 rounded-full" ></span>
                            </li>
                            <li className="flex relative" >
                                <IoNotificationsOutline size={25} className="text-gray-300" />
                                <span className="h-3 absolute w-3 left-4 bg-orange-600 rounded-full" ></span>
                            </li>
                        </ul>

                        <ul className="flex flex-row space-x-2 ml-8" >
                            <li className="text-gray-300 text-sm" >
                                Tiago
                            </li>
                            <li>
                                <span className="min-h-10 min-w-10 text-white font-semibold bg-orange-600 rounded-full px-3 py-1" >T</span>
                            </li>
                            <li>
                                <MdOutlineArrowDropDown size={25} className="text-gray-400" />
                            </li>
                        </ul>
                    </section>
                </nav>
    )
}