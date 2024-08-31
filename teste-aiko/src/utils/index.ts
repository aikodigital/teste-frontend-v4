import dayjs from "dayjs";

export function formatDateTime(date: Date | string, options: Intl.DateTimeFormatOptions = {
  dateStyle: 'short',
  timeStyle: 'short',
}) {
  const d = dayjs(date).toDate();

  const formatter = new Intl.DateTimeFormat('pt-BR', options);

  return formatter.format(d);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function generateRandomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}