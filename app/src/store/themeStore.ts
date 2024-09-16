import { create } from "zustand";

interface ThemeStore {
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: document.documentElement.classList.contains("dark"),
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
}));
