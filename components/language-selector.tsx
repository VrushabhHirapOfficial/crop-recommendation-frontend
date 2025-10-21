"use client"

import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Languages } from "lucide-react"

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <div className="space-y-2">
      <Label htmlFor="language" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Languages className="w-5 h-5 text-primary" />
        {currentLanguage.name}
      </Label>
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger id="language" className="glass-input bg-white/10 backdrop-blur-md border border-white/20 rounded-xl w-full focus:border-primary/50 focus:ring-2 focus:ring-primary/20">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="glass-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl">
          {languages.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className="glass-button hover:bg-primary/5 focus:bg-primary/5 rounded-lg transition-all duration-300 text-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
