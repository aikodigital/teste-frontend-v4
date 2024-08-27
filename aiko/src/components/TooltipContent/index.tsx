import equipmentServices from "../../services/equipment"
import equipmentModelServices from "../../services/equipmentModelServices"
import equipmentsStateHistoryServices from "../../services/equipmentsStateHistoryServices"
import equipmentsStateServices from "../../services/equipmentsStateServices"

interface ITooltipContent {
    equipmentId: string
}

export default function TooltipContent({ equipmentId }: ITooltipContent): JSX.Element {
    const { getEquipmentsById } = equipmentServices()
    const { getEquipmentsStateById } = equipmentsStateServices()
    const { getEquipmentsStateHistoryById } = equipmentsStateHistoryServices()
    const { getEquipmentsModelById } = equipmentModelServices()

    const equipment = getEquipmentsById(equipmentId)
    const latestStatus = getEquipmentsStateHistoryById(equipmentId)?.states.at(-1)
    const status = latestStatus && getEquipmentsStateById(latestStatus.equipmentStateId)
    const equipmentModel = equipment && getEquipmentsModelById(equipment?.equipmentModelId)
    const hourlyEarnings = equipmentModel?.hourlyEarnings.find(h => h.equipmentStateId === status?.id)?.value

    return (
        <div>
            <h4>
                {equipment?.name} - {equipmentModel?.name}
            </h4>
            <h4>
                Ganhos/hora: {hourlyEarnings}
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