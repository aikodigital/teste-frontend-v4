/* eslint-disable react/no-children-prop */
import PageWrapper from "@/components/wrapper";
import { Equipments } from "@/pages/equipments";
import { ListEquipments } from "@/pages/listEquipments";

export const EquipmentsRoutes = {
   equipments: {
      path: '/',
      use: '/',
      element: (
         <PageWrapper
            children={<Equipments />}
         />
      ),
   },
   equipmentsDetail: {
      path: '/equipments/:id',
      use: '/equipments/:id',
      isPublic: false,
      element: (
         <PageWrapper
            children={<></>}
            render={(params) => <Equipments id={params.id} />}
         />
      ),
   },
   list: {
      path: '/equipments/list',
      use: '/equipments/list',
      element: (
         <PageWrapper
            children={<ListEquipments />}
         />
      ),
   },
}
