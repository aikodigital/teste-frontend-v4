export interface IState {
    id: string;
    name: string;
    color: string;
}

export interface IStateHistory {
    equipmentId: string;
    states: IStateHistoryState[];
}

export interface IStateHistoryState {
    date: string;
    equipmentStateId: string;
    state?: IState;
}