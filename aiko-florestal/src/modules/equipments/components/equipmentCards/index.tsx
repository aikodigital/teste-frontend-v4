/* eslint-disable react-hooks/rules-of-hooks */
import { ChevronLeft, ChevronRight, FilterIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SelectField from '@/components/select';
import useEquipmentData, { EquipmentWithStatus } from '@/hooks/useEquipments';
import { ConvertDate } from '@/utils/convertDate';
import { FindColorByStatus } from '@/utils/findColor';
import { Truncate } from '@/utils/truncate';

interface EquipCardsProps {
   equip: EquipmentWithStatus;
   states?: {
      date: string;
      equipmentStateId: string;
      name: string;
   };
}

const EquipmentCard = ({ equip, states }: EquipCardsProps) => {
   if (!equip) return null;
   const navigate = useNavigate();
   return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 border-l-[3px] border-green-300">
         <div className="flex justify-between items-center">
            <span className="font-bold text-gray-600">ID {Truncate(equip.id, 15)}</span>
            <span className={`px-3 min-w-28 max-w-32 flex justify-center items-center py-1 rounded-full text-white ${FindColorByStatus(states ? states.name : equip.status)}`}>
               {states ? states.name : equip.status}
            </span>
         </div>
         <h2 className="font-semibold text-lg text-gray-700">{equip.name}</h2>
         <p className="text-sm text-gray-500">{equip.modelName}</p>
         {equip.position && !states && (
            <div>
               <p className="text-sm text-gray-500">Posição: {equip.position.lat}, {equip.position.lon}</p>
               <div className='flex justify-between'>
                  <p className="text-sm text-gray-500 mt-2">{ConvertDate(equip.position.date)}</p>
                  <p
                     className="text-sm text-green-400 mt-2 cursor-pointer"
                     onClick={() => navigate(`/equipments/${equip.id}`)}
                  >Ver detalhes</p>
               </div>
            </div>
         )}
      </div>
   )
}

interface EquipmentListCardProps {
   search: string;
   setSearch: (value: string) => void;
   selectedState: string;
   setSelectedState: (value: string) => void;
   model: string;
   setModel: (value: string) => void;
   id?: string;
}

export const EquipmentListCard = ({
   search,
   setSearch,
   selectedState,
   setSelectedState,
   model,
   setModel,
   id,
}: EquipmentListCardProps) => {
   const itemsPerPage = id ? 7 : 5
   const { equipmentsMapped } = useEquipmentData();
   const [currentPage, setCurrentPage] = useState(1);
   const [visibleFilter, setVisibleFilter] = useState(false);

   const idOrNot = id ? equipmentsMapped.filter(equip => equip.id === id) : equipmentsMapped;

   const filteredData = idOrNot.filter((equip) => {
      return (
         equip.name.toLowerCase().includes(search.toLowerCase()) &&
         (selectedState ? equip.status === selectedState : true) &&
         (model ? equip.modelName === model : true)
      )
   });

   const getStateHistoryFiltered = idOrNot.map((equip) => {
      return equip.stateHistory.filter((state) => {
         return (
            (state.name.toLowerCase().includes(search.toLowerCase()) &&
               (selectedState ? state.name === selectedState : true))
         )
      })
   });

   const totalItems = id ? getStateHistoryFiltered.map((state) => state.length) : filteredData.length;
   const totalPages = Math.ceil(Number(totalItems) / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);
   const idData = getStateHistoryFiltered.map((state) => {
      return state.slice(startIndex, startIndex + itemsPerPage);
   })

   const handleChangePage = (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
   };

   return (
      <div className="md:max-w-md mx-auto mt-5">
         <div className="flex justify-between items-center mb-4 p-2 rounded-lg">
            <h1 className="text-2xl font-bold text-gray-700">
               {!id ? "Visualização Rápida" : "Estados e Posições"}
            </h1>
            <p
               onClick={() => setVisibleFilter(!visibleFilter)}
               className="px-3 flex items-center justify-center gap-1 text-green-400 py-1 cursor-pointer rounded-md hover:bg-gray-200"
            >
               <FilterIcon className='h-4 w-4' />
               {visibleFilter ? "Fechar" : "Filtros"}
            </p>
         </div>

         {visibleFilter && (
            <div className="relative mb-6 flex flex-col gap-3">
               {!id && (
                  <input
                     type="text"
                     className="w-full p-2 border border-gray-300 rounded-lg"
                     placeholder="Pesquise o nome de um equipamento"
                     value={search}
                     onChange={handleSearch}
                  />
               )}
               <div className='flex md:flex-row flex-col gap-3'>
                  <div className='w-full'>
                     <SelectField
                        value={selectedState}
                        placeholder='Estado'
                        options={[
                           { value: '', label: 'Todos' },
                           { value: 'Operando', label: 'Operando' },
                           { value: 'Parado', label: 'Parado' },
                           { value: 'Manutenção', label: 'Manutenção' },
                        ]}
                        onChange={(e) => setSelectedState(e.target.value)}
                     />
                  </div>
                  {!id && (
                     <div className='w-full'>
                        <SelectField
                           value={model}
                           placeholder='Modelo'
                           options={[
                              { value: '', label: 'Todos' },
                              { value: 'Caminhão de carga', label: 'Caminhão de carga' },
                              { value: 'Harvester', label: 'Harvester' },
                              { value: 'Garra traçadora', label: 'Garra traçadora' },
                           ]}
                           onChange={(e) => setModel(e.target.value)}
                        />
                     </div>
                  )}
               </div>
            </div>
         )}
         {!id ? (
            currentData.map((equip) => (
               <EquipmentCard key={equip.id} equip={equip} />
            ))
         ) : (
            idData.map((equip) => (
               equip.map((state, index) => (
                  <EquipmentCard key={index} equip={idOrNot[0]} states={state} />
               ))
            ))
         )}
         <div className="flex justify-end items-center p-2 bg-white rounded-lg">
            <div className="flex items-center space-x-2">
               <button
                  onClick={() => handleChangePage(currentPage - 1)}
                  className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"
                  disabled={currentPage === 1}
               >
                  <ChevronLeft className='h-4 w-4' />
               </button>
               <span>{currentPage}</span>
               <button
                  onClick={() => handleChangePage(currentPage + 1)}
                  className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"
                  disabled={currentPage === totalPages}
               >
                  <ChevronRight className='h-4 w-4' />
               </button>
            </div>
         </div>
      </div>
   );
};
