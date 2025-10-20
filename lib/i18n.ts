import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import resourcesToBackend from "i18next-resources-to-backend"

i18n
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`../public/locales/${language}/${namespace}.json`)
    })
  )
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: typeof window !== "undefined" ? localStorage.getItem("indra-dhanu-language") || "en" : "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
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
