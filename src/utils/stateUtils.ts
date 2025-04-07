/**
 * Retorna as classes CSS para um determinado estado de equipamento
 * @param stateName Nome do estado
 * @returns Objeto com as classes CSS para cor de fundo e texto
 */
export const getStateStyles = (stateName: string): { stateColor: string; textColor: string } => {
  let stateColor = 'bg-gray-100';
  let textColor = 'text-gray-700';
  
  switch (stateName) {
    case 'Operando':
      stateColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'Parado':
      stateColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      break;
    case 'Manutenção':
      stateColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
  }
  
  return { stateColor, textColor };
};