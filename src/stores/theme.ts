import { defineStore } from 'pinia';
import { THEME_STORAGE } from 'src/stores/storageConfig';

export type ThemeType = {
  dark: boolean;
};

const defaultData = { dark: false };

const getThemeStorage = () => {
  const storage = localStorage.getItem(THEME_STORAGE);
  const dark: ThemeType = storage ? JSON.parse(storage) : defaultData;

  return dark;
};

export const useThemeStore = defineStore(THEME_STORAGE, {
  state: () => ({ themeData: getThemeStorage() }),
  getters: {
    storeThemeDataGetter(state) {
      return state.themeData;
    },
  },
  actions: {
    storageThemeSave(theme: ThemeType) {
      this.themeData = theme;
      localStorage.setItem(THEME_STORAGE, JSON.stringify(this.themeData));
    },
    storageThemeRemove() {
      this.themeData = defaultData;
      localStorage.removeItem(THEME_STORAGE);
    },
  },
});
