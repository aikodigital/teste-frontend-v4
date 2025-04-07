import { FC } from 'react';
import { FilterItem } from '../../types/filters';

interface FilterCheckboxProps {
    filter: FilterItem;
    // Função para alternar o estado do filtro quando o usuário clicar
    toggleFilter: (id: string) => void;
    // Esquema de cores para diferenciar visualmente os tipos de filtros
    colorScheme: 'blue' | 'purple' | 'green';
}

const FilterCheckbox: FC<FilterCheckboxProps> = ({ filter, toggleFilter, colorScheme }) => {
    // Mapeamento de esquemas de cores para classes Tailwind correspondentes
    const colorClass = {
        blue: 'bg-blue-500 border-blue-500',
        purple: 'bg-purple-500 border-purple-500',
        green: 'bg-green-500 border-green-500'
    }[colorScheme];

    return (
        <div 
            className="flex items-center p-1.5 hover:bg-gray-50 rounded cursor-pointer" 
            onClick={() => toggleFilter(filter.id)}
            role="menuitem"
        >
            <div 
                // Aplica cores diferentes baseadas no estado ativo do filtro
                className={`w-4 h-4 rounded-sm border flex items-center justify-center ${filter.active ? colorClass : 'border-gray-300'}`}
                aria-hidden="true"
            >
                {filter.active && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className="ml-2 text-sm text-gray-700">{filter.label}</span>
        </div>
    );
};

export default FilterCheckbox;