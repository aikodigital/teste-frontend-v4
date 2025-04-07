import { useState, useEffect } from 'react'

export const useEquipmentModel = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetch("/data/equipmentModel.json")
            .then((res) => res.json())
            .then(setModels)
            .catch(console.error);
    }, []);

    return { models };
};
