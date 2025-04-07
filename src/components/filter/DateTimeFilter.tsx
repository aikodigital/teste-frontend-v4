import { FC, ChangeEvent } from 'react';

interface DateTimeFilterProps {
    // Data selecionada para filtrar os equipamentos no mapa
    selectedDate: Date;
    // Callback para propagar mudanças de data para o componente pai
    onDateChange: (date: Date) => void;
    // Limites de datas para restringir a seleção do usuário
    minDate?: string;
    maxDate?: string;
}

const DateTimeFilter: FC<DateTimeFilterProps> = ({ 
    selectedDate, 
    onDateChange, 
    minDate, 
    maxDate 
}) => {
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        // Validação para garantir que apenas datas válidas sejam processadas
        if (!isNaN(newDate.getTime())) {
            onDateChange(newDate);
        }
    };

    return (
        <div className="flex-1">
            <label htmlFor="date-filter" className="sr-only">
                Filtrar por data e hora
            </label>
            <input
                id="date-filter"
                type="datetime-local"
                className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md shadow-sm focus:outline-none
                focus:ring-blue-500 focus:border-blue-500 bg-gray-50" 
                // Converte a data para o formato aceito pelo input datetime-local
                value={selectedDate.toISOString().slice(0, 16)}
                onChange={handleDateChange} 
                min={minDate} 
                max={maxDate}
                aria-label="Filtrar por data e hora"
            />
        </div>
    );
};

export default DateTimeFilter;