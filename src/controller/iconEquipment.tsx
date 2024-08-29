export function getIcon(equipmentModelId: string) {
    switch (equipmentModelId) {
        case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
            return './images/caminhao-carga.png'
        case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
            return './images/harvester.png'
        case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
            return './images/garra-tracadora.png'
        default:
    }
}