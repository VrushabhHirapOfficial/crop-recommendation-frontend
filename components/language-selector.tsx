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

  return (
    <div className="space-y-2">
      <Label htmlFor="language" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Languages className="w-5 h-5 text-primary" />
        Language / भाषा / भाषा
      </Label>
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger id="language" className="w-full bg-white/5 border-white/20 rounded-xl">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
          <SelectItem value="mr">मराठी (Marathi)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
