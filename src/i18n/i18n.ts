import { createI18n } from "vue-i18n";
import us from "@/i18n/locales/us.json";
import br from "@/i18n/locales/br.json";

const i18n = createI18n({
  legacy: false,
  locale: "br",
  fallbackLocale: "us",
  messages: { us, br },
});

export default i18n;
