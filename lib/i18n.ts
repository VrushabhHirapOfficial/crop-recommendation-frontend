import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import HttpBackend from "i18next-http-backend"

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: typeof window !== "undefined" ? localStorage.getItem("indra-dhanu-language") || "en" : "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  })

// Save language changes to localStorage
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("indra-dhanu-language", lng)
  }
})

export default i18n
