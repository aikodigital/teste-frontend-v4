import { useContext } from "react"
import { EquipmentContext } from "../contexts/EquipmentContext"

// Função que retorna o contexto de equipamentos
export function useEquipment() {
    const context = useContext(EquipmentContext)
    if (!context) {
        throw new Error('useEquipment must be used within an EquipmentProvider')
    }
    return context
}