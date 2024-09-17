export interface EquipmentToMapData {
    id: string;
    idModel: string;
    state: string;
    pos: EquipmentPosition;
    label: Label
}

export interface EquipmentPosition {
    lat: number,
    lng: number
}

export interface Label {
    text: string;
    color: string
}

export interface HistoricStates {
    name: string;
    model: string;
    states: State[];
}

export interface State {
    date: string;
    stateName: string
}