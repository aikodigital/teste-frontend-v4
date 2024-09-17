export const FindColorByStatus = (status: string) => {
   switch (status) {
      case 'Operando':
         return 'bg-green-300';
      case 'Parado':
         return 'bg-orange-300';
      case 'Manutenção':
         return 'bg-red-400';
      default:
         return 'bg-gray-400';
   }
}
