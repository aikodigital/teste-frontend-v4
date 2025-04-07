import { useState, useEffect } from 'react'

export const useEquipmentPositionHistory = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fetch("/data/equipmentPositionHistory.json")
            .then((res) => res.json())
            .then(setPositions)
            .catch(console.error);
    }, []);

    return { positions };
};
