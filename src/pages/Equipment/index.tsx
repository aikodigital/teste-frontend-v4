import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { PiSealPercent } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import {Marker} from "react-leaflet/Marker";
import {Popup} from "react-leaflet/Popup";
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { FaLuggageCart } from "react-icons/fa";
import { TbChartInfographic } from "react-icons/tb";

export default function Equipment(){

    const {id} = useParams();
    const [percentual, setPercentual] = React.useState(0);
    const [positions, setPositions] = React.useState([]);
    const [model, setModel] = React.useState("");
    const [state, setState] = React.useState("");

    const getLastState = async() => {
        const stateHistory = await fetch("/data/equipmentStateHistory.json");
        const stateHistoryData = await stateHistory.json();

        const states = await fetch("/data/equipmentState.json");
        const statesData = await states.json();

        const statesById = stateHistoryData.find(item => item.equipmentId === id);
        const lastStateId = statesById.states[0].equipmentStateId;

        const stateName = statesData.find(item => item.id === lastStateId);

        setState(stateName.name);
    }

    const getModel = async() => {
        const equipment = await fetch("/data/equipment.json");
        const equipmentData = await equipment?.json();

        const model = await fetch("/data/equipmentModel.json");
        const modelData = await model?.json();

        const equipmentById = equipmentData?.find(item => item.id === id);

        const equipmentModel = modelData?.find(item=> equipmentById.equipmentModelId === item.id);

        setModel(equipmentModel?.name);
    } 

    const getPercentual = async () => {

        const history = await fetch("/data/equipmentStateHistory.json");
        const historyStates = await history.json();

        const stateName = await fetch("/data/equipmentState.json");
        const stateData = await stateName.json();

        const historyById = historyStates?.find(item => item?.equipmentId === id);

        const stateOperandId = stateData?.find(item => item?.name === "Operando");
        
        const stateOperandLength = historyById?.states?.filter(item => item?.equipmentStateId === stateOperandId?.id);

        console.log(`stateOperandLength: ${stateOperandLength.length}`)

        setPercentual((stateOperandLength.length / historyById.states.length) * 100);

    }

    const getLastsPositions = async () => {

        const positions = await fetch("/data/equipmentPositionHistory.json");
        const positionsData = await positions.json();

        const positionsById = positionsData.find(item => item.equipmentId === id);

        setPositions(positionsById.positions);

    }

    

    useEffect(()=>{
        const fetchData = async () => {  
            
            if(id){
                await getPercentual();
                await getLastsPositions();
                await getModel();
                await getLastState();            
            }
        }

        fetchData();   
    }, [id])


    return(
        <main className="flex w-full min-h-screen">
            <Sidebar/>

            <section className="w-5/6 flex flex-col bg-gray-50" >
                <Navbar/>

                <main className="w-full flex flex-col h-auto pt-7 px-6" >

                    <div className="flex w-full h-auto space-x-3" >
                        <div className="w-2/6 h-28 p-5 flex flex-col bg-white rounded-md" >
                            <div className="flex justify-between mb-2" >
                                <h1 className="text-sm" >Percentual de produtividade</h1>
                                <div className="w-8 h-8 flex justify-center items-center bg-orange-200 rounded-md" >
                                    <PiSealPercent size={20} className="text-orange-600" />
                                </div>
                            </div>

                            <h1 className="text-xl" >{percentual}%</h1>
                        </div>
                        <div className="w-2/6 h-28 p-5 flex flex-col bg-white rounded-md" >
                            <div className="flex justify-between mb-2" >
                                <h1 className="text-sm" >Modelo do Equipamento</h1>
                                <div className="w-8 h-8 flex justify-center items-center bg-green-200 rounded-md" >
                                    <FaLuggageCart size={20} className="text-green-600" />
                                </div>
                            </div>

                            <h1 className="text-xl" >{model}</h1>
                        </div>
                        <div className="w-2/6 h-28 p-5 flex flex-col bg-white rounded-md" >
                            <div className="flex justify-between mb-2" >
                                <h1 className="text-sm" >Último estado</h1>
                                <div className="w-8 h-8 flex justify-center items-center bg-red-200 rounded-md" >
                                    <TbChartInfographic size={20} className="text-red-600" />
                                </div>
                            </div>

                            <h1 className="text-xl" >{state}</h1>
                        </div>
                    </div>

                    <h1 className="mt-8 mb-4" >Histórico de posições</h1>

                    <MapContainer center={[-19.126536, -45.947756]} zoom={10} scrollWheelZoom={true} style={{height: "400px", width: "100%", backgroundColor: "red"}} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                            {positions.map((item)=>(
                                <Marker position={[item.lat, item.lon]}>
                                    <Popup>

                                    Data: {new Date(item.date).toLocaleString()}
                                    
                                    </Popup>
                                </Marker> 
                            ))}
                    
                    </MapContainer>

                </main>
            </section>
        </main>
    );
}