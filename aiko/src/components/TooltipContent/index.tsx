import equipmentsStateHistoryServices from "../../services/equipmentsStateHistoryServices"
import equipmentsStateServices from "../../services/equipmentsStateServices"

interface ITooltipContent {
    equipmentId: string
}

export default function TooltipContent({ equipmentId }: ITooltipContent): JSX.Element {
    const { getEquipmentsStateById } = equipmentsStateServices()
    const { getEquipmentsStateHistoryById } = equipmentsStateHistoryServices()

    const latestStatus = getEquipmentsStateHistoryById(equipmentId).states.sort().reverse()[0]
    const status = getEquipmentsStateById(latestStatus.equipmentStateId)

    return (
        <div style={{ color: status.color }}>
            <b>
                {status.name}
            </b>
            <div>
                {status.id}
            </div>
        </div>
    )

}