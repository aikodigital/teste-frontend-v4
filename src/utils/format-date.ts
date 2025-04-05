export const formatDate = (date: string): string =>
  new Date(new Date(date).getTime() + 3 * 60 * 60 * 1000).toISOString();
