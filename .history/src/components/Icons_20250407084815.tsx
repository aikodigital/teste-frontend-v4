import L from 'leaflet';
import IconTruckOperating from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconHarvester from '../assets/Marcadores/harvester-operando.png';
import IconTractor from '../assets/Marcadores/garra-tracadora-operando.png';

export const Sort = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
        <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z" />
    </svg>
);

export const Search = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
        <path d="M640-560v-126 126ZM174-132q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v337q-15-23-35.5-42T760-528v-204l-120 46v126q-21 0-41 3.5T560-546v-140l-160-56v523l-226 87Zm26-96 120-46v-468l-120 40v474Zm440-12q34 0 56.5-20t23.5-60q1-34-22.5-57T640-400q-34 0-57 23t-23 57q0 34 23 57t57 23Zm0 80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 43.5T778-238l102 102-56 56-102-102q-18 11-38.5 16.5T640-160ZM320-742v468-468Z" />
    </svg>
);

export const IconStates = (props: any) => {

    const { id, state } = props

    function getColorByIdAndStatus(id, estado) {
        if (id === "a3540227-2f0e-4362-9517-92f41dabbfdf") {
            if (estado === "Operando") return "verde";
            if (estado === "Parado") return "vermelho";
            if (estado === "Manutenção") return "amarelo";
        }

        if (id === "a4b0c114-acd8-4151-9449-7d12ab9bf40f") {
            if (estado === "Operando") return "verde";
            if (estado === "Parado") return "vermelho";
            if (estado === "Manutenção") return "amarelo";
        }

        if (id === "9c3d009e-0d42-4a6e-9036-193e9bca3199") {
            if (estado === "Operando") return "verde";
            if (estado === "Parado") return "vermelho";
            if (estado === "Manutenção") return "amarelo";
        }

        return "cinza"; // padrão se não bater nenhum caso
    }


    const truck = L.icon({
        iconUrl: IconTruck,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const harvester = L.icon({
        iconUrl: IconHarvester,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const tractor = L.icon({
        iconUrl: IconTractor,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });
    return (
        <h1></h1>
    )
}
