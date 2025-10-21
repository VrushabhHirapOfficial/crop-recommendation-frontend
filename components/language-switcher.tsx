"use client"

import { useTranslation } from "react-i18next"
import { Languages, ChevronDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <div className="flex items-center gap-2">
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-lg w-32 h-9 px-3 text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span className="text-sm">{currentLanguage.flag}</span>
              <span className="text-gray-600 dark:text-gray-300">{currentLanguage.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white/95 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/20 rounded-xl shadow-xl">
          {languages.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className="hover:bg-gray-100 dark:hover:bg-white/20 focus:bg-gray-100 dark:focus:bg-white/20 rounded-lg transition-all duration-300 text-gray-700 dark:text-gray-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{language.flag}</span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
