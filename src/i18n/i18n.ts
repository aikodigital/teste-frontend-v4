import { createI18n } from "vue-i18n";
import en from "@/i18n/locales/en.json";
import pt from "@/i18n/locales/pt.json";

const i18n = createI18n({
  legacy: false,
  locale: "pt",
  fallbackLocale: "en",
  messages: { en, pt },
});

export default i18n;
