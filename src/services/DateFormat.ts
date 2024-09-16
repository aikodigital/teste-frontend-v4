import { defineStore } from 'pinia';

export const useDateFormat = defineStore('date', {
  state: () => ({
    dateFormat: 'dd/MM/yyyy',
  }),
  getters: {
    formattedDate: (state) => (date: string) => {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        ...state.dateFormat
      };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  actions: {
    setDateFormat(format: string) {
      this.dateFormat = format;
    },
  },
});
