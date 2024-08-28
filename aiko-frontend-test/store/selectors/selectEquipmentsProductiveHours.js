export const selectEquipmentsProductiveHours = (id) => (state) => {
    const equipmentStateHistory = state.equipmentStateHistory.data;

    if (equipmentStateHistory.length > 0) {

        const equipment = equipmentStateHistory.find(e => e.equipmentId === id);

        if (!equipment) return null;

        const hoursStates = [
            {
                state: 'operando',
                hours: 0,
                id: "0808344c-454b-4c36-89e8-d7687e692d57"
            },
            {
                state: 'parado',
                hours: 0,
                id: "baff9783-84e8-4e01-874b-6fd743b875ad"
            },
            {
                state: 'manutencao',
                hours: 0,
                id: "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
            }
        ];

        let inicialHourState = {
            hour: null,
            id: ''
        };

        let totalHour = null;

        for (let index = 0; index < equipment.states.length - 1; index++) {
            if (!totalHour) {
                totalHour = new Date(equipment.states[index].date);
            }
            if (inicialHourState.id !== equipment.states[index].equipmentStateId) {
                inicialHourState.id = equipment.states[index].equipmentStateId;
                inicialHourState.hour = new Date(equipment.states[index].date);
            }

            if (inicialHourState.id !== equipment.states[index + 1].equipmentStateId) {
                hoursStates.forEach(state => {
                    if (state.id === inicialHourState.id) {
                        state.hours += (new Date(equipment.states[index + 1].date) - inicialHourState.hour) / (1000 * 60 * 60);
                    }
                });
            }

            if (index + 1 === equipment.states.length - 1) {
                totalHour = (totalHour + new Date(equipment.states[index + 1].date)) / (1000 * 60 * 60);
            }

            inicialHourState = {
                hour: new Date(equipment.states[index + 1].date),
                id: equipment.states[index + 1].equipmentStateId
            };
        }

        return {
            equipmentId: equipment.equipmentId,
            totalHour,
            hoursStates
        };
    }

    return null;
};
