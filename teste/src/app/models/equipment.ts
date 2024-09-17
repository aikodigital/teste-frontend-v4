export class EquipmentsFormatedList {
    "equipmentsFormatedList": EquipmentFormated[];
}

export class EquipmentsList {
    "equipmentsList": Equipment[];
}

export class EquipmentFormated {
    "id": string;
    "name": string;
    "equipmentModelId": string;
    "equipmentModelName": any;
    "hourlyEarnings": any;
    "dateLastState": any;
    "stateId": any;
    "stateName": any;
    "stateColor": any;
    "states": any[];
    "dateLastPosition": any;
    "position":any;
    "positions": any;
    "content": any;
}

export class Equipment {
    "id": string;
    "equipmentModelId": string;
    "name": string;
}

export class EquipmentState {
    "id": string;
    "name": string;
    "color": string;
}

export class EquipmentModel {
    "id": string;
    "name": string;
    "hourlyEarnings": HourlyEarnings[];
}

export class HourlyEarnings {
    "equipmentStateId": string;
    "value": string;
}

export class EquipmentStateHistory {
    "equipmentId": string;
    "states": StateHistory[];
}

export class StateHistory {
    "date": Date;
    "equipmentStateId": string;
}

export class EquipmentPositionHistory {
    "equipmentId": string;
    "positions": Positions[];
}

export class Positions {
    "date": Date;
    "lat": number;
    "lon": number;
}