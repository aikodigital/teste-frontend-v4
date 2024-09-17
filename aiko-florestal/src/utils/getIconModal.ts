import Caminhao from "@/assets/models-icons/caminhao-de-carga.png";
import Harvester from "@/assets/models-icons/combine-harvester.png";
import Garra from "@/assets/models-icons/maquina-de-garra.png";

export const GetModelIcon = (modelName: string) => {
   switch (modelName) {
      case "Caminhão de carga":
         return Caminhao;
      case "Harvester":
         return Harvester;
      case "Garra traçadora":
         return Garra;
      default:
         return Caminhao;
   }
};
