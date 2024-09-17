
import { ArrowLeft, EllipsisIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/defaultButton';
import TextField from '@/components/input/textField';
import SelectField from '@/components/select';
import { DynamicTable } from '@/components/table';
import AppTransition from '@/components/transitions';
import useEquipmentData from '@/hooks/useEquipments';
import { FindColorByStatus } from '@/utils/findColor';

export const ServiceListEquipments = () => {
   const navigate = useNavigate();
   const { equipmentsMapped } = useEquipmentData();

   const [visible, setVisible] = useState(false);
   const [search, setSearch] = useState('');
   const [selectedState, setSelectedState] = useState('');
   const [model, setModel] = useState('');

   const columns = [
      {
         title: 'Nome do equipamento',
         key: 'name'
      },
      {
         title: 'Modelo',
         key: 'modelName'
      },
      {
         title: 'Status',
         key: 'status',
         render: (item: { status: string }) => <span className={`py-1 min-w-28 max-w-32 flex justify-center items-center  rounded-full text-white ${FindColorByStatus(item.status)}`}>{item.status}</span>
      },
      {
         title: 'Última posição',
         key: 'position',
         render: (item: { position: { lat: number; lon: number; } }) =>
            `${item.position.lat}, ${item.position.lon}`
      },
      {
         title: '',
         key: '',
         render: (item: { id: string }) =>
            <EllipsisIcon
               className='w-5 h-5 cursor-pointer text-green-400'
               onClick={() => navigate(`/equipments/${item.id}`)}
            />
      },
   ];

   const filteredData = equipmentsMapped.filter((equip) => {
      return (
         equip.name.toLowerCase().includes(search.toLowerCase()) &&
         (selectedState ? equip.status === selectedState : true) &&
         (model ? equip.modelName === model : true)
      )
   });

   return (
      <DynamicTable
         columns={columns}
         data={filteredData}
         searchInputComponent={
            <div className='md:px-8 px-4 mt-2 align-center flex flex-col justify-center'>
               <AppTransition
                  show={visible}
                  transition='dropdown'
                  delay={5}
               >
                  {visible && (
                     <div className='flex items-center gap-4 max-md:flex-col'>
                        <div className='w-full md:w-2/3'>
                           <TextField
                              value={search}
                              placeholder='Pesquise o nome de um equipamento'
                              onChange={(e) => setSearch(e.target.value)}
                           />
                        </div>
                        <div className='w-full md:w-1/3'>
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
                        <div className='w-full md:w-1/3'>
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
                     </div>
                  )}
               </AppTransition>
               {visible && (
                  <div className="flex md:flex-row flex-col items-center md:justify-end justify-center gap-4 text-right mt-8">
                     <Button
                        title='Limpar'
                        variant="secondary"
                        className="max-md:w-full"
                        onClick={() => {
                           setSearch('');
                           setSelectedState('');
                           setModel('');
                        }}
                     />
                  </div>
               )}
            </div>
         }
         header={{
            title: 'Listagem de equipamentos',
            description: 'Aqui você pode visualizar todos os equipamentos cadastrados',
            actionComponent: (
               <Button
                  title='Filtros avançados'
                  variant="secondary"
                  className='max-md:hidden'
                  onClick={() => setVisible(!visible)}
               />
            ),
         }}
         backButton={
            <ArrowLeft
               className='hover:cursor-pointer'
               width={24}
               height={24}
               onClick={() => navigate('/')}
            />
         }
      />
   );
};
