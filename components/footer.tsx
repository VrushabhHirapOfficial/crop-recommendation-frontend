"use client"

import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-primary dark:bg-green-600 text-primary-foreground dark:text-white py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          <span className="font-bold">{t("app_title_full")}</span>
        </p>
        <p className="text-xs text-primary-foreground/70 dark:text-green-100 mt-2">
          {t("hackathon_tagline")}
        </p>
      </div>
    </footer>
  )
}
