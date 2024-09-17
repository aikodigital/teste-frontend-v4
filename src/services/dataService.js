export default {
    async fetchEquipmentPositionHistory() {
      return this.fetchJsonData('equipmentPositionHistory')
    },
    async fetchEquipment() {
      return this.fetchJsonData('equipment')
    },
    async fetchEquipmentModel(){
      return this.fetchJsonData('equipmentModel')
    },
    async fetchEquipmentState(){
      return this.fetchJsonData('equipmentState')
    },
    async fetchEquipmentStateHistory(){
      return this.fetchJsonData('equipmentStateHistory')
    },
  
    async fetchJsonData(fileName) {
        try {
            const response = await fetch(`data/${fileName}.json`);
            if (!response.ok) {
              throw new Error(`Erro carregando ${fileName}.json`);
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error(`Erro carregando ${fileName}.json:`, error);
            throw error;
          }
        }
}