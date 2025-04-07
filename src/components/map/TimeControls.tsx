import { FC } from 'react';
import TimeButton from './TimeButton';

interface TimeControlsProps {
  selectedDate: Date;
  // Função para avançar/retroceder no tempo em horas
  advanceTime: (hours: number) => void;
  // Função para saltar para pontos específicos na linha do tempo
  jumpToTime: (timePoint: 'start' | 'end' | 'specific', specificDate?: Date) => void;
  formatDate: (date: Date) => string;
}

const TimeControls: FC<TimeControlsProps> = ({ 
  selectedDate, 
  advanceTime, 
  jumpToTime, 
  formatDate 
}) => {
  return (
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-[1500] flex items-center bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-gray-200">
      <button 
        onClick={() => jumpToTime('start')}
        className="p-2 text-gray-600 hover:text-blue-800 transition-colors"
        title="Ir para o início (01/02/2021)"
        aria-label="Ir para o início (01/02/2021)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Botões para navegação em intervalos predefinidos */}
      <TimeButton onClick={() => advanceTime(-24)} title="Voltar 1 dia">-1d</TimeButton>
      <TimeButton onClick={() => advanceTime(-6)} title="Voltar 6 horas">-6h</TimeButton>
      <TimeButton onClick={() => advanceTime(-1)} title="Voltar 1 hora">-1h</TimeButton>
      
      {/* Exibição centralizada da data atual selecionada */}
      <div className="mx-3 px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 whitespace-nowrap min-w-[160px] text-center">
        {formatDate(selectedDate)}
      </div>
      
      <TimeButton onClick={() => advanceTime(1)} title="Avançar 1 hora">+1h</TimeButton>
      <TimeButton onClick={() => advanceTime(6)} title="Avançar 6 horas">+6h</TimeButton>
      <TimeButton onClick={() => advanceTime(24)} title="Avançar 1 dia">+1d</TimeButton>
      
      <button 
        onClick={() => jumpToTime('end')}
        className="p-2 text-gray-600 hover:text-blue-800 transition-colors"
        title="Ir para o fim (28/02/2021)"
        aria-label="Ir para o fim (28/02/2021)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default TimeControls;