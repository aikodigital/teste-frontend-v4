/**
 * Formata uma data para exibição
 * @param date Data a ser formatada
 * @param format Formato desejado ('full' para data e hora, 'day' para apenas dia/mês)
 * @returns String formatada
 */
export const formatDate = (date: Date, format: 'full' | 'day' = 'full'): string => {
  if (format === 'day') {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};