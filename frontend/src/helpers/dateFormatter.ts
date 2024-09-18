export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Formatar a data e a hora
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year} - ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};

export const compareThreeDates = (
  date1: string,
  date2: string,
  date3: string,
  indexes: number[]
): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const d3 = new Date(date3);

  if (d1.getTime() === d2.getTime()) {
    return indexes[0];
  }

  // Verifica se a primeira data está entre a segunda e a terceira data
  if (d1 > d2 && d1 < d3) {
    return indexes[0]; // Retorna o primeiro índice novamente, como descrito
  }

  // Verifica se a primeira data é igual à terceira data
  if (d1.getTime() === d3.getTime()) {
    return indexes[1]; // Retorna o segundo índice do array
  }

  // Caso não seja nenhuma das condições, retorna -1
  return -1;

};
