"use client"

import { useTranslation } from "react-i18next"

export default function Header() {
  const { t } = useTranslation()
  
  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-lg">🌾</div>
          <h1 className="text-4xl md:text-5xl font-bold">Indra Dhanu</h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">{t("tagline")}</h2>
        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto text-balance">
          {t("app_description")}
        </p>
      </div>
    </header>
  )
}
