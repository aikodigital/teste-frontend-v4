import { useState } from "react";

import { EquipmentListCard } from "@/modules/equipments/components/equipmentCards";
import { Map } from "@/modules/equipments/components/map";

export const ServiceEquipments = () => {
   const [search, setSearch] = useState('');
   const [selectedState, setSelectedState] = useState('');
   const [model, setModel] = useState('');

   return (
      <section className="w-full flex md:flex-row flex-col gap-4 h-screen">
         <div className='md:w-2/4 w-full flex md:flex-row flex-col h-full pointer-events-none'>
            <div className='w-full pointer-events-auto md:h-full h-[80vh] overflow-y-scroll'>
               <EquipmentListCard
                  model={model}
                  search={search}
                  selectedState={selectedState}
                  setModel={setModel}
                  setSearch={setSearch}
                  setSelectedState={setSelectedState}
               />
            </div>
         </div>
         <div className="md:w-3/4 w-full border-[0.5rem] border-white">
            <Map
               search={search}
               selectedState={selectedState}
               model={model}
            />
         </div>
      </section>
   )
};
