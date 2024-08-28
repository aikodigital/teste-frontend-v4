export function pickColor(position: number){
    const colors = ["bg-rose-600","bg-orange-400","bg-yellow-300","bg-lime-500","bg-teal-500","bg-blue-700","bg-violet-700","bg-red-600","bg-indigo-900"]
    return colors[position];
  }

export  function variantColor(stateId: string): string {
    const states = [
    {
      id: "0808344c-454b-4c36-89e8-d7687e692d57",
      name: "Operando",
      color: "#2ecc71",
      twBg: "bg-green-500"
    },
    {
      id: "baff9783-84e8-4e01-874b-6fd743b875ad",
      name: "Parado",
      color: "#f1c40f",
      twBg: "bg-yellow-500"
    },
    {
      id: "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
      name: "Manutenção",
      color: "#e74c3c",
      twBg: "bg-red-500"
    }
  ]

  return states.find(state => state.id === stateId)?.twBg || ''
}

export function getPaginatedItems<Type>(page: number, itemsPerPage: number, totalItems: number, items: Type[]): Type[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return items.slice(startIndex, endIndex);
}

export default {
    pickColor,
    variantColor,
    getPaginatedItems
}