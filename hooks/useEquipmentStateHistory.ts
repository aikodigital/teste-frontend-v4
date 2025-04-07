import { useState, useEffect } from 'react';

export const useEquipmentStateHistory = () => {
    const [stateHistory, setStateHistory] = useState([]);

    useEffect(() => {
        fetch("/data/equipmentStateHistory.json")
            .then((res) => res.json())
            .then(setStateHistory)
            .catch(console.error);
    }, []);

    return { stateHistory };
};
