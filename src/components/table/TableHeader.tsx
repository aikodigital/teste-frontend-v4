import { FC } from 'react';

const TableHeader: FC = () => (
    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
        <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
            </th>
        </tr>
    </thead>
);

export default TableHeader;