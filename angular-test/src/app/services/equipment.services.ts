import { Injectable, signal } from "@angular/core";
import { EQUIPMENT } from "../data/equipment";
import { EQUIPMENT_POSITION_HISTORY } from "../data/equipmentPositionHistory";
import { EQUIPMENT_STATE_HISTORY } from "../data/equipmentStateHistory";
import { EQUIPMENT_STATE } from "../data/equipmentState";
import { EQUIPMENT_MODEL } from "../data/equipmentModel";
import { EquipmentPosition, EquipmentToMapData, HistoricStates, State } from "../interfaces/equiments.interfaces";

@Injectable({
    providedIn: 'root'
})
export class EquipmentService {
    equiments = signal<EquipmentToMapData[]>([]);
    getEquipments = this.equiments.asReadonly();

    constructor() {
        this.getEquipmentsPositions();
    }

    getEquipmentsPositions(){
        const equipments = EQUIPMENT;
        const equipmentsPositions = EQUIPMENT_POSITION_HISTORY;
        const equipmentStateStory = EQUIPMENT_STATE_HISTORY;
        const states = EQUIPMENT_STATE;
        let currentState: string | undefined = '';
        equipments.map( (equipment) => {
            equipmentsPositions.map( (equipmentPositions) => {
                if(equipment.id === equipmentPositions.equipmentId) {
                    const currentPosition = {
                        lat: equipmentPositions.positions[equipmentPositions.positions.length-1].lat,
                        lng: equipmentPositions.positions[equipmentPositions.positions.length-1].lon
                    };
                    //determinate state
                    equipmentStateStory.map( (eqStory) => {
                        if(eqStory.equipmentId === equipment.id ) {
                            const equipmentStateId = eqStory.states[eqStory.states.length - 1].equipmentStateId;
                            states.map( (state) => {
                                if(state.id === equipmentStateId){
                                    currentState = state.name
                                }
                            })
                        }
                    })
                    //update signal
                    this.equiments.update( (prevState) => [...prevState,{
                        id: equipment.id,
                        idModel: equipment.equipmentModelId,
                        state: currentState!,
                        pos: currentPosition,
                        label: {
                            text: equipment.name,
                            color: 'blue'
                        }
                    }])
                }
            })
        })
        
    }

    getHistoyStates(equipment:EquipmentToMapData){
        let historicStates!: HistoricStates;
        let model = '';
        let name: string | undefined = '';
        let states:State[] = [];
        const equipmentModel = EQUIPMENT_MODEL;
        const equipmentStateStory = EQUIPMENT_STATE_HISTORY;
        const equipmentStates = EQUIPMENT_STATE;
        equipmentStateStory.map( (eqHistory) => {
            if(eqHistory.equipmentId === equipment.id){
                name = equipment?.label?.text;
                equipmentStates.map( (eqState) => {
                    eqHistory.states.map( (eqStateHistoric) => {
                        if(eqStateHistoric.equipmentStateId === eqState.id){
                            states.push({
                                date: eqStateHistoric.date,
                                stateName: eqState.name
                            })
                        }
                    })
                })
            }
            equipmentModel.map( (eqModel) => {
                if(eqModel.id === equipment.idModel){
                    model = eqModel.name
                }
            });
            historicStates = {
                name: name!,
                model: model,
                states: states
            }
        });
        return historicStates;
    }

    getHistoricPositions(equipmentId:string):EquipmentPosition[]{
        const equipmentHistoricPos = EQUIPMENT_POSITION_HISTORY;
        let historicPosByEquipment: EquipmentPosition[] = [];
         equipmentHistoricPos.map( (eqHistPos) => {
            if(equipmentId === eqHistPos.equipmentId){
                eqHistPos.positions.map( (pos) => {
                    historicPosByEquipment.push({
                        lat: pos.lat,
                        lng: pos.lon
                    })
                })
            }
        })
        return historicPosByEquipment;
    }

    setIcons() {
        //mode 1
        // const parser = new DOMParser();
        // const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
        // <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
        // </svg>`;
        //     this.equiments().map( (eq:any) => {
        //         console.log('me llamo una vez...........')
        //     this.equiments.update( (prev) => [...prev,eq.pos.content = parser.parseFromString(svgString, "image/svg+xml").documentElement])
        // })
}

} 