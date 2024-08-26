import equipmentServices from "../../services/equipment"
import equipmentsStateHistoryServices from "../../services/equipmentsStateHistoryServices"
import equipmentsStateServices from "../../services/equipmentsStateServices"

interface ITooltipContent {
    equipmentId: string
}

export default function TooltipContent({ equipmentId }: ITooltipContent): JSX.Element {
    const { getEquipmentsById } = equipmentServices()
    const { getEquipmentsStateById } = equipmentsStateServices()
    const { getEquipmentsStateHistoryById } = equipmentsStateHistoryServices()

    const equipment = getEquipmentsById(equipmentId)
    const latestStatus = getEquipmentsStateHistoryById(equipmentId)?.states.at(-1)
    const status = latestStatus && getEquipmentsStateById(latestStatus.equipmentStateId)

    return (
        <div>
            <h4>
                {equipment?.name}
            </h4>
            <h3 style={{ color: status?.color }}>
                {status?.name}
            </h3>
            <div>
                Última atualização
            </div>
            <b>
                {new Date(latestStatus?.date as string).toLocaleString().replace(",", " às")}
            </b>
        </div>
    )

}