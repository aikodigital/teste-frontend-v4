import { defineStore } from "pinia";
import { ref } from "vue";
import i18n from "@/i18n/i18n";

export const useLanguageStore = defineStore("language", () => {
  const getBrowserLanguage = () => {
    return (
      localStorage.getItem("language") ||
      (navigator.language.startsWith("pt") ? "pt" : "en")
    );
  };

  const language = ref(getBrowserLanguage());

  const setLanguage = (lang: string) => {
    language.value = lang;
    i18n.global.locale.value = lang as "pt" | "en";
    localStorage.setItem("language", lang);
  };

  setLanguage(language.value);

  return { language, setLanguage };
});
