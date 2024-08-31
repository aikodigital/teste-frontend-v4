import React, { useState } from 'react'
import { useContextData } from '../../context/context';

export default function Form() {
    const { selectedState, setSelectedState, selectedModel, setSelectedModel } = useContextData();

    return (
        <>
            <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState || ''}>
                <option value=''>Todos os Estados</option>
                <option value="Operando">Operando</option>
                <option value="Manutenção">Manutenção</option>
            </select>

            <select onChange={(e) => setSelectedModel(e.target.value)} value={selectedModel || ''}>
                <option value=''>Todos os Modelos</option>
                <option value="Modelo A">Modelo A</option>
                <option value="Modelo B">Modelo B</option>
            </select>
        </>
    )
}
