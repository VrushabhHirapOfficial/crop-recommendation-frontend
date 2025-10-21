"use client"

import { useTranslation } from "react-i18next"

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="glass-header relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      {/* Floating particles */}
      <div className="absolute top-8 left-8 w-2 h-2 bg-primary/30 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-16 right-12 w-1 h-1 bg-accent/40 rounded-full animate-float opacity-80" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-float opacity-70" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 glass-card flex items-center justify-center text-2xl sm:text-3xl shadow-2xl">
              🌾
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in">
              Indra Dhanu
            </h1>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-balance animate-slide-up">
            {t("tagline")}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white max-w-3xl mx-auto text-balance leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t("app_description")}
          </p>

          {/* Decorative line */}
          <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 bg-primary/50 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </header>
  )
}
