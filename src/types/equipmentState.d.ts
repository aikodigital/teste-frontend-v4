type State = "Operando" | "Parado" | "Manutenção"

export interface EquipmentState{
    id: string,
    name: State,
    color: string
}