import { useState, useEffect } from 'react'

export const useEquipmentState = () => {
    const [states, setStates] = useState([]);

    useEffect(() => {
        fetch("/data/equipmentState.json")
            .then((res) => res.json())
            .then(setStates)
            .catch(console.error);
    }, []);
    
    return { states };
};
