import { IoIosArrowBack } from "react-icons/io";
import { BsFillHouseFill } from "react-icons/bs";
import { FaCaravan } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import {Marker} from "react-leaflet/Marker";
import {Popup} from "react-leaflet/Popup";
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { Equipment } from "types/equipment";
import { EquipmentModel } from "types/equipmentModel";
import { EquipmentPositionHistory } from "types/equipmentPositionHistory";
import { EquipmentState } from "types/equipmentState";
import { EquipmentStateHistory } from "types/equipmentStateHistory";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Main(){

    const [equipment, setEquipment] = React.useState<Equipment[]>([]);
    const [equipmentModel, setEquipmentModel] = React.useState("Todos");
    const [equipmentPositionHistory, setEquipmentPositionHistory] = React.useState<EquipmentPositionHistory[]>();
    const [equipmentState, setEquipmentState] = React.useState("Todos");
    const [equipmentStateHistory, setEquipmentStateHistory] = React.useState<EquipmentStateHistory[]>();
    const [equipmentPositions, setEquipmentPositions] = React.useState<Object[]>();
    const [equipmentStatus, setEquipmentStatus] = React.useState("");
    const [equipmentCount, setEquipmentCount] = React.useState(0);
    const [originalPositions, setOriginalPositions] = React.useState();
    const navigate = useNavigate();

     const getStatus = async (id: string) => {
        const response = await fetch("/data/equipmentStateHistory.json");
        const history = await response?.json();

        const historyById = history?.find(item => item.equipmentId === id);

        const states = await fetch("/data/equipmentState.json");
        const stateData = await states?.json();

        const stateById = stateData?.find(item => historyById.states[0].equipmentStateId === item.id);

        return stateById?.name;

     }

     const getHistoryStates = async (id: string) => {
        const response = await fetch("/data/equipmentStateHistory.json");
        const history = await response?.json();

        const historyById = history?.find(item => item.equipmentId === id);

        console.log(`HistoryById ${typeof historyById.states}`)

        const states = await fetch("/data/equipmentState.json");
        const stateData = await states?.json();

        const arr = [];

        historyById?.states?.forEach(element => {

            const stateById = stateData?.find(item => element.equipmentStateId === item.id);

            arr.push({date: new Date(element?.date), state: stateById?.name})

        })

        return arr;
     }

     const searchByModel = async() => {

        await getLastPositions(async (arr)=> {
            if (equipmentModel !== "Todos") {
                const filtered = arr.filter(item => item.model === equipmentModel);
                setEquipmentPositions(filtered);  // Atualiza com os resultados filtrados
            }else{
                await getLastPositions();
            }
        });

     }

     const searchByState = async() => {

        await getLastPositions(async (arr)=> {
            if (equipmentState !== "Todos") {
                const filtered = arr.filter(item => item.status === equipmentState);
                setEquipmentPositions(filtered);  // Atualiza com os resultados filtrados
            }else{
                await getLastPositions();
            }
        });

     }

     const getLastPositions = async(callback?: Function) => {
        const response = await fetch("/data/equipment.json");
        const equipmentData = await response?.json();

        let data = await fetch("/data/equipmentPositionHistory.json");
        let equipmentHistory = await data?.json();

        const arr = [];

        for (const element of equipmentData) {
            let equipmentById = equipmentHistory?.find(item => item?.equipmentId === element?.id);

            if (equipmentById) {
                const status = await getStatus(equipmentById.equipmentId);

                const history = await getHistoryStates(equipmentById.equipmentId);

                console.log(`status ${status}`);

                if (status && status.length > 0) {
                    arr.push({
                        equipmentId: equipmentById?.equipmentId,
                        lat: equipmentById?.positions[0]?.lat,
                        lon: equipmentById?.positions[0]?.lon,
                        status: status,
                        history: history,
                        model: element.equipmentModelId
                    });
                }
            }
        }

        
        setEquipmentPositions(arr);

        if(callback){
            callback(arr);
        }
        
     }

     
     useEffect(()=>{
        const fetchData = async () => {    
            await getLastPositions();            
        }

        fetchData();
     }, []);

     useEffect(()=>{
        const search = async () => {

            await searchByState();
        
        }

        search();
     }, [equipmentState]);

     useEffect(()=>{
        const search = async () => {

            await searchByModel();
        
        }

        search();
     }, [equipmentModel]);
    


    return(
        <main className="flex w-full min-h-screen">

            {/* Sidebar */}
            <Sidebar/>
            {/* Fim Sidebar */}


            <section className="w-5/6 flex flex-col bg-gray-50" >

                {/* Navbar */}
                <Navbar/>
                {/* Fim Navbar */}
                <main className="w-full flex flex-col h-auto pt-7 px-6" >

                    <section className="flex w-full space-x-8 h-auto mb-6" >
                        <div className="flex flex-col" >
                            <p className="mb-2" >Buscar por estado:</p>
                            <select value={equipmentState} onChange={(e)=> setEquipmentState(e.target.value)} className="border border-gray-200 rounded-md h-8 w-40">
                                <option value="Todos">Todos</option>
                                <option value="Operando">Operando</option>
                                <option value="Parado">Parado</option>
                                <option value="Manutenção">Manutenção</option>
                            </select>
                        </div>
                        <div className="flex flex-col" >
                            <p className="mb-2" >Buscar por modelo:</p>
                            <select value={equipmentModel} onChange={(e)=> setEquipmentModel(e.target.value)} className="border border-gray-200 rounded-md h-8 w-40">
                                <option value="Todos">Todos</option>
                                <option value="a3540227-2f0e-4362-9517-92f41dabbfdf">Caminhão de carga</option>
                                <option value="a4b0c114-acd8-4151-9449-7d12ab9bf40f">Harvester</option>
                                <option value="9c3d009e-0d42-4a6e-9036-193e9bca3199">Garra traçadora</option>
                            </select>
                        </div>   
                    </section>

                    <MapContainer center={[-19.126536, -45.947756]} zoom={10} scrollWheelZoom={true} style={{height: "400px", width: "100%", backgroundColor: "red"}} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {equipmentPositions?.map((item)=> (
                            <Marker position={[item?.lat, item?.lon]}>
                                <Popup>

                                
                                <h1 className="text-base" >Dados do Equipamento</h1>

                                <div className="flex flex-row space-x-1" >
                                    <p>Status:</p>
                                    <p className="font-bold" >{item.status}</p>
                                </div>

                                <p>
                                 Histórico: 
                                </p>


                                 <ul className="overflow-y-scroll max-h-24 mb-3" >
                                    {item?.history?.map((data, index) => (
                                    <li key={index}>
                                        {data.date.toLocaleString()} - {data.state}
                                    </li>
                                    ))}
                                </ul>

                                <button onClick={()=>navigate(`/equipment/${item?.equipmentId}`)} className="h-7 w-32 font-semibold bg-orange-600 rounded-md text-white" >Mais informações</button>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                </main>
            </section>
        </main>
    )
}