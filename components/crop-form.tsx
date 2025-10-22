"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { usePreferences } from "@/context/PreferencesContext"
import { getWeatherByCity, extractFarmDataFromWeather } from "@/services/weather"
import { getSoilDefaults } from "@/services/soil"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Droplets, Leaf, Zap, Thermometer, Cloud, Pi as PH, Waves, MapPin, CloudRain } from "lucide-react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"

interface FormData {
  nitrogen: number
  phosphorus: number
  potassium: number
  temperature: number
  humidity: number
  ph_value: number
  rainfall: number
}

interface CropFormProps {
  onSubmit: (data: FormData) => void
  loading: boolean
  onWeatherFetch?: (autoFilledFields?: string[]) => void
}

export default function CropForm({ onSubmit, loading, onWeatherFetch }: CropFormProps) {
  const { t } = useTranslation()
  const { defaultCity } = usePreferences()
  const [formData, setFormData] = useState<FormData>({
    nitrogen: 100,
    phosphorus: 20,
    potassium: 30,
    temperature: 25.5,
    humidity: 90,
    ph_value: 6.2,
    rainfall: 300,
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [city, setCity] = useState<string>("")
  const [autoFetch, setAutoFetch] = useState<boolean>(false)
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false)
  const [weatherMessage, setWeatherMessage] = useState<string>("")

  // Load default city and weather data on mount
  useEffect(() => {
    if (defaultCity) {
      setCity(defaultCity)
    }

    // Load saved weather data from localStorage
    const savedWeather = localStorage.getItem("indra-dhanu-default-weather")
    if (savedWeather) {
      try {
        const weatherData = JSON.parse(savedWeather)
        if (weatherData.main) {
          setFormData(prev => ({
            ...prev,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
          }))
          setWeatherMessage(`${t("default_weather_loaded")} ${weatherData.name}`)
        }
      } catch (e) {
        console.error("Failed to load weather data", e)
      }
    }
  }, [defaultCity, t])

  const [autoFilledFields, setAutoFilledFields] = useState<string[]>([])
  const [soilDataFound, setSoilDataFound] = useState<boolean | null>(null)

  // Reset soil data found state when city changes
  useEffect(() => {
    setSoilDataFound(null)
  }, [city])

  // Fetch weather and soil data
  const handleFetchWeather = async () => {
    if (!city) {
      setWeatherMessage(t("city_not_found"))
      return
    }

    setWeatherLoading(true)
    setWeatherMessage("")

    try {
      // Call both APIs simultaneously
      const [weatherData, soilData] = await Promise.all([
        getWeatherByCity(city),
        getSoilDefaults(city) // May return null if city not found in JSON
      ])

      const farmData = extractFarmDataFromWeather(weatherData)

      // Auto-fill weather data (always available)
      setFormData(prev => ({
        ...prev,
        temperature: farmData.temperature,
        humidity: farmData.humidity,
        rainfall: farmData.rainfall,
      }))

      // Auto-fill soil data only if available
      if (soilData) {
        setFormData(prev => ({
          ...prev,
          nitrogen: soilData.nitrogen,
          phosphorus: soilData.phosphorus,
          potassium: soilData.potassium,
          ph_value: soilData.ph_value,
        }))

        setSoilDataFound(true)

        // Track which fields were auto-filled for animation
        setAutoFilledFields(['temperature', 'humidity', 'rainfall', 'nitrogen', 'phosphorus', 'potassium', 'ph_value'])

        setWeatherMessage(`✅ ${t("data_fetched_combined")} for ${soilData.region}`)
      } else {
        // Only weather data available - soil data not found in JSON
        setSoilDataFound(false)
        setAutoFilledFields(['temperature', 'humidity', 'rainfall'])

        setWeatherMessage(`⚠️ ${t("soil_data_not_found")}`)
      }

      // Save weather data to localStorage
      localStorage.setItem("indra-dhanu-default-weather", JSON.stringify(weatherData))

      // Call parent callback for input animations
      onWeatherFetch?.()

      // Clear auto-filled animation after 3 seconds
      setTimeout(() => {
        setAutoFilledFields([])
      }, 3000)

    } catch (error: any) {
      setWeatherMessage(error.message || t("weather_error"))
    } finally {
      setWeatherLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number.parseFloat(value) || 0,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const fields = [
    { name: "nitrogen", labelKey: "nitrogen", unit: t("kg_per_ha"), icon: Leaf, color: "text-green-600" },
    { name: "phosphorus", labelKey: "phosphorus", unit: t("kg_per_ha"), icon: Zap, color: "text-yellow-600" },
    { name: "potassium", labelKey: "potassium", unit: t("kg_per_ha"), icon: Droplets, color: "text-blue-600" },
    { name: "temperature", labelKey: "temperature", unit: t("celsius"), icon: Thermometer, color: "text-orange-600" },
    { name: "humidity", labelKey: "humidity", unit: t("percent"), icon: Cloud, color: "text-cyan-600" },
    { name: "ph_value", labelKey: "ph_value", unit: "", icon: PH, color: "text-purple-600" },
    { name: "rainfall", labelKey: "rainfall", unit: t("mm"), icon: Waves, color: "text-blue-500" },
  ]

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <form
        onSubmit={handleSubmit}
        className="card-glass dark:bg-white/15 dark:backdrop-blur-2xl dark:border dark:border-white/30 p-8 md:p-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl mx-auto max-w-4xl"
      >
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-foreground dark:text-gray-200 mb-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t("enter_farm_conditions")}
        </motion.h3>
        <p className="text-center text-muted-foreground dark:text-gray-400 mb-8">
          {t("provide_data")}
        </p>

        {/* City Input with Auto-fetch */}
        <motion.div
          className="mb-6 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="city" className="flex items-center gap-2 text-sm font-semibold text-foreground dark:text-gray-200">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            {t("location_optional")}
          </Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (city && !loading && !weatherLoading) {
                      handleFetchWeather()
                    }
                  }
                }}
                disabled={loading || weatherLoading}
                className="input-glass flex-1 dark:bg-white/10 dark:border-white/20 bg-white/5 border-b-2 border-white/20 focus:border-accent rounded-none focus:rounded-xl"
                placeholder={defaultCity || "Enter your city name"}
              />
              <Button
                type="button"
                onClick={handleFetchWeather}
                disabled={loading || weatherLoading || !city}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 rounded-xl btn-animate"
              >
                {weatherLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CloudRain className="w-4 h-4 mr-2" />
                    {t("fetch_weather")}
                  </>
                )}
              </Button>
            </div>
            {weatherMessage && (
              <p className={`text-xs ${weatherMessage.includes("success") || weatherMessage.includes("loaded") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {weatherMessage}
              </p>
            )}
            <div className="flex items-center gap-2">
              <Checkbox
                id="autoFetch"
                checked={autoFetch}
                onCheckedChange={(checked) => setAutoFetch(checked as boolean)}
              />
              <Label
                htmlFor="autoFetch"
                className="text-xs text-muted-foreground dark:text-gray-400 cursor-pointer select-none"
              >
                {t("auto_fetch_weather")}
              </Label>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {fields.map((field, idx) => {
            const Icon = field.icon
            return (
              <motion.div
                key={field.name}
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold text-foreground dark:text-gray-200">
                  <Icon className={`w-5 h-5 ${field.color.replace('600', '400')} dark:${field.color}`} />
                  {t(field.labelKey)}
                </Label>
                <div className="relative">
                  <motion.div
                    className="relative"
                    animate={{
                      boxShadow:
                        focusedField === field.name
                          ? "0 0 20px rgba(101, 163, 13, 0.3)"
                          : "0 0 0px rgba(101, 163, 13, 0)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      step="0.1"
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleSubmit(e)
                        }
                      }}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      disabled={loading}
                      className={`input-glass pr-12 dark:bg-white/10 dark:border-white/20 bg-white/5 border-b-2 border-white/20 focus:border-accent rounded-none focus:rounded-xl ${autoFilledFields.includes(field.name) ? 'input-highlight bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600' : ''}`}
                      placeholder="0"
                    />
                  </motion.div>
                  {field.unit && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground dark:text-gray-400 font-medium">
                      {field.unit}
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Info Note about Auto-filled Values */}
        {soilDataFound !== null && (
          <motion.div
            className={`mb-6 p-4 rounded-xl ${
              soilDataFound
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                soilDataFound
                  ? 'bg-green-500 dark:bg-green-400'
                  : 'bg-yellow-500 dark:bg-yellow-400'
              }`}>
                <span className="text-white text-xs font-bold">
                  {soilDataFound ? '✓' : '⚠'}
                </span>
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  soilDataFound
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-yellow-800 dark:text-yellow-200'
                }`}>
                  {soilDataFound
                    ? '📊 Default soil values for your region loaded. You can edit them.'
                    : '📍 Weather data loaded. Enter soil values manually or try a different city.'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-accent via-accent to-orange-500 hover:from-accent hover:to-orange-600 dark:from-yellow-500 dark:via-yellow-600 dark:to-orange-500 dark:hover:from-yellow-600 dark:hover:to-orange-600 text-white dark:text-gray-900 font-bold py-6 text-lg rounded-full transition-all duration-300 btn-animate btn-glow shadow-lg hover:shadow-2xl hover:shadow-accent/50 dark:hover:shadow-yellow-500/50"
          >
            {loading ? (
              <motion.div
                className="flex items-center gap-2"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t("analyzing")}</span>
              </motion.div>
            ) : (
              t("submit")
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
