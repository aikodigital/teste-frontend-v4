
export function percentualEquipament(input: number[]) {
    const operando = input[0]
    return operando / 24 * 100 
}

export function ganhoEquipamento(input: number[]) {
    const operando = input[0]
    const manutencao = input[1]
    const parado = input[2]

    return 10 * operando + manutencao * parado 
}

export function formatDate(dateString: string){
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  