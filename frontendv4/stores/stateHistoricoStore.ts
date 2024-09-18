import { defineStore } from 'pinia'

export const useHistoricoStore = defineStore('historico', {
    state: () => ({ 
       equipName: [] as string[],
       estadoNome: [] as string[],
       estadoData: [] as string[],
       historicoPosicoesData : [] as string[],
       //armazena latitude e longitude das posicoes
       historicoLat : [] as string[],
       historicoLong : [] as string[]
    }),
    getters: {
      exibir: (state) => {

        // Retorna as propriedades para serem acessadas no componente
        return {
            estadoNome: state.estadoNome,
            estadoData: state.estadoData,
            historicoLat: state.historicoLat,
            historicoLong: state.historicoLong
          };
    
       
      }

     
    },
    actions: {
      //passa os parametros ao ser clicado no marcador no mapa
        handleMarkerClick(equipmentStateHist: any, equipmentState: any,equipmentHistory:any,equip:any ) {
            //limpa as propriedades
            this.equipName = [];
            this.estadoNome = [];
            this.estadoData = [];
            this.historicoLat = [];
            this.historicoLong = [];

            if(equip){
                this.equipName.push(equip);
            }

            if (equipmentStateHist?.states && equipmentStateHist.states.length > 0) {
                equipmentStateHist.states.forEach((estado:any) => {
                    // Detalhes do estado do equipamento
                    const detalhes = equipmentState.find((state: any) => state.id === estado.equipmentStateId);
                    const estadoNome = detalhes?.name;
                    const estadoData = estado.date;
                    
                    // Adiciona ao array
                    if (estadoNome && estadoData) {
                        this.estadoNome.push(estadoNome);
                        this.estadoData.push(estadoData);
                    }
                });
            }


    if(equipmentHistory?.positions && equipmentHistory.positions.length > 0){

                //para cada interação que armazena o historico das posicoes
                equipmentHistory.positions.forEach((posicoes:any) =>{
                  //armazena data das posicoes
                  const historicoPosicoesData = posicoes.date;
                  //armazena latitude e longitude das posicoes
                  const historicoLat = posicoes.lat;
                  const historicoLong = posicoes.lon;
                
                  if(historicoPosicoesData && historicoLat && historicoLong){
                    this.historicoLat.push(historicoLat);
                    this.historicoLong.push(historicoLong);
                  }
               
      
                })
              }


        }
    },
});
