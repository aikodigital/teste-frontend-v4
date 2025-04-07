import { useState, useEffect } from 'react'

export const useEquipmentData = () => {
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        fetch("/data/equipment.json")
            .then((res) => res.json())
            .then(setEquipments)
            .catch(console.error);
    }, []);

    return { equipments };
};