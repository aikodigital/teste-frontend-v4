import { createContext, useState, useEffect } from "react";

const EquipmentContext = createContext();

export const Equipments = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [equipment, setEquipment] = useState([])

    useEffect(() => {
        fetchEquipment()
    }, [])

    const fetchEquipment = async () => {
        const response = await fetch(`/equipment?_sort=id&_order=desc`);
        const data = await response.json();

        setEquipment(data);
        setIsLoading(false);
    }
  
    return <EquipmentContext.Provider value={{ equipment, isLoading }}>
        {children}
    </EquipmentContext.Provider>
}

export default EquipmentContext