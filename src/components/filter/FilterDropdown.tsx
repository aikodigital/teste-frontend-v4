import { FC } from 'react';
import FilterCheckbox from './FilterCheckbox';
import { FilterItem } from '../../types/filters';

interface FilterDropdownProps {
    label: string;
    filters: FilterItem[];
    toggleFilter: (id: string) => void;
    // Contador para indicar visualmente quantos filtros estão ativos
    activeCount: number;
    isOpen: boolean;
    onToggle: () => void;
    // Esquema de cores para diferenciar visualmente os tipos de filtros
    colorScheme: 'blue' | 'purple' | 'green';
}

const FilterDropdown: FC<FilterDropdownProps> = ({
    label,
    filters,
    toggleFilter,
    activeCount,
    isOpen,
    onToggle,
    colorScheme
}) => {
    // Mapeamento de esquemas de cores para classes Tailwind correspondentes
    const colorClasses = {
        blue: {
            button: 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200',
            badge: 'bg-blue-500',
            checkbox: 'bg-blue-500 border-blue-500'
        },
        purple: {
            button: 'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200',
            badge: 'bg-purple-500',
            checkbox: 'bg-purple-500 border-purple-500'
        },
        green: {
            button: 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200',
            badge: 'bg-green-500',
            checkbox: 'bg-green-500 border-green-500'
        }
    };

    // IDs únicos para garantir associação correta entre botão e dropdown (acessibilidade)
    const buttonId = `${label.toLowerCase()}-filter-button`;
    const dropdownId = `${label.toLowerCase()}-filter-dropdown`;

    return (
        <div className="relative">
            <button 
                id={buttonId}
                className={`flex items-center px-3 py-1.5 bg-gradient-to-r ${colorClasses[colorScheme].button} 
                rounded-md text-gray-700 text-sm font-medium border transition-colors`}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={dropdownId}
            >
                {label}
                {activeCount > 0 && 
                    <span className={`ml-1.5 ${colorClasses[colorScheme].badge} text-white rounded-full w-4 h-4 flex items-center justify-center text-xs`}
                          aria-label={`${activeCount} filtros ativos`}>
                        {activeCount}
                    </span>
                }
                <svg 
                    // Rotação do ícone para indicar visualmente o estado do dropdown
                    className={`w-3 h-3 ml-1.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            <div 
                id={dropdownId}
                // Animação suave para melhorar a experiência do usuário
                className={`absolute left-0 mt-1 w-44 bg-white rounded-md shadow-lg z-10 transition-all duration-200 ease-in-out ${
                    isOpen 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform -translate-y-2 pointer-events-none'
                }`}
                role="menu"
                aria-labelledby={buttonId}
            >
                <div className="p-1.5">
                    {filters.map(filter => (
                        <FilterCheckbox
                            key={filter.id}
                            filter={filter}
                            toggleFilter={toggleFilter}
                            colorScheme={colorScheme}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;