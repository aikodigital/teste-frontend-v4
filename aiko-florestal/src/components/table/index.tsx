import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';

interface Column {
   title: string;
   key: string;
   render?: (item: any) => React.ReactNode;
}

interface TableProps {
   backButton?: React.ReactNode;
   header: {
      title: string;
      description?: string;
      actionComponent?: React.ReactNode;
   };
   searchInputComponent?: React.ReactNode;
   data: any[];
   columns: Column[];
   itemsPerPageOptions?: number[];
}

export const DynamicTable = ({
   backButton,
   header,
   searchInputComponent,
   data,
   columns,
   itemsPerPageOptions = [5, 10, 15],
}: TableProps) => {

   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);

   const totalItems = data.length;
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   const handleChangePage = (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
   };

   const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1);
   };

   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentData = data.slice(startIndex, startIndex + itemsPerPage);

   const renderActionComponent = useMemo(() => {
      return header.actionComponent && <div>{header.actionComponent}</div>;
   }, [header.actionComponent]);

   return (
      <Fragment>
         <div className="flex md:items-end items-center justify-between pb-4 mt-12">
            <div className='flex space-x-2 md:pt-0 pt-3'>
               {backButton}
               <h1 className="text-xl flex flex-col gap-1 font-normal leading-6 text-gray-900">
                  {header.title}
                  <p className="text-base text-gray-500">{header.description}</p>
               </h1>
            </div>
            {renderActionComponent}
         </div>
         <div className="rounded bg-white pt-4 shadow-md">
            {searchInputComponent}
            <div className="px-2 sm:px-6 lg:px-8 max-md:flex max-md:overflow-y-hidden max-md:mx-2">
               <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                     <div className="min-w-full py-2 pb-8 align-middle md:px-6 lg:px-8">
                        <div className="shadow md:rounded-lg overflow-x-auto overflow-y-clip">
                           <table className="min-w-full divide-y divide-gray-200 border-gray-200 text-lg text-gray-600">
                              <thead className='rounded-md bg-gray-50'>
                                 <tr>
                                    {columns.map((column, index) => (
                                       <th
                                          key={index}
                                          scope='col'
                                          className="py-3 px-6 text-left font-['Inter'] text-sm font-bold tracking-widest text-gray-900"
                                       >
                                          {column.title}
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                 {currentData.map((item, index) => (
                                    <tr
                                       key={index}
                                       className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                       {columns.map((column, colIndex) => (
                                          <td
                                             key={colIndex}
                                             className="py-3 px-6 text-left whitespace-nowrap"
                                          >
                                             {column.render ? column.render(item) : item[column.key]}
                                          </td>
                                       ))}
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white border-t">
                     <div className="flex items-center space-x-2">
                        <span>Por página:</span>
                        <select
                           className="border rounded-md p-2"
                           value={itemsPerPage}
                           onChange={handleItemsPerPageChange}
                        >
                           {itemsPerPageOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                           ))}
                        </select>
                        <span>
                           de {totalItems} Registros
                        </span>
                     </div>

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
            </div>
         </div>
      </Fragment>
   );
};
