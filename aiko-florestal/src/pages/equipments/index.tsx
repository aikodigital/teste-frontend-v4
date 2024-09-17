import { ServiceEquipments } from "@/modules/equipments/forms"
import { ServiceViewEquipments } from "@/modules/equipments/subpages/viewEquipments"

interface EquipmentsProps {
   id?: string
}

export const Equipments = ({ id }: EquipmentsProps) => {
   return(
      id ? <ServiceViewEquipments id={id} /> : <ServiceEquipments />
   )
}
