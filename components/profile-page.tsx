"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { usePreferences } from "@/context/PreferencesContext"
import { useTheme } from "next-themes"
import { getWeatherByCity } from "@/services/weather"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import { User, Mail, Briefcase, MapPin, Check, Settings, Globe, Edit, Phone, Loader2, AlertCircle, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  const { t } = useTranslation()
  const { defaultCity, setDefaultCity, userProfile, updateUserProfile } = usePreferences()
  const { theme, setTheme } = useTheme()

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(userProfile)
  const [profileSaved, setProfileSaved] = useState(false)

  // City/weather state
  const [cityInput, setCityInput] = useState(defaultCity)
  const [citySaved, setCitySaved] = useState(false)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState<string>("")

  useEffect(() => {
    setCityInput(defaultCity)
  }, [defaultCity])

  useEffect(() => {
    setProfileData(userProfile)
  }, [userProfile])

  // Toggle dark mode using the global theme provider
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Save profile changes
  const handleSaveProfile = () => {
    updateUserProfile(profileData)
    setIsEditing(false)
    setProfileSaved(true)

    // Hide success message after 3 seconds
    setTimeout(() => setProfileSaved(false), 3000)
  }

  // Cancel profile editing
  const handleCancelEdit = () => {
    setProfileData(userProfile)
    setIsEditing(false)
  }

  // Handle profile input changes
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  // Save city with weather fetch
  const handleSaveCity = async () => {
    if (!cityInput) {
      setWeatherError(t("city_not_found"))
      return
    }

    setWeatherLoading(true)
    setWeatherError("")

    try {
      // Fetch weather data for the city
      const weatherData = await getWeatherByCity(cityInput)

      // Save city and weather data
      setDefaultCity(cityInput)
      localStorage.setItem("indra-dhanu-default-weather", JSON.stringify(weatherData))

      setCitySaved(true)
      setTimeout(() => setCitySaved(false), 2000)
    } catch (error: any) {
      setWeatherError(error.message || t("weather_error"))
    } finally {
      setWeatherLoading(false)
    }
  }

  return (
    <div className="w-full">
      <section className="relative min-h-screen px-4 py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 text-center">
              {t("user_profile")}
            </h1>
            <p className="text-lg text-muted-foreground dark:text-gray-300 text-center">
              {isEditing ? t("edit_profile") : "Manage your profile and preferences"}
            </p>
          </motion.div>

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 glass-card dark:bg-white/20 flex items-center justify-center text-3xl">
                    <User className="w-10 h-10 text-primary dark:text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground dark:text-gray-200">{profileData.name}</h2>
                    <p className="text-muted-foreground dark:text-gray-400">
                      {profileData.name === "Your Name"
                        ? "👋 Welcome! Click 'Edit Profile' to get started"
                        : "Welcome back!"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="glass-button-primary dark:bg-white/15 dark:backdrop-blur-lg dark:border dark:border-green-500/30 px-6 py-3 text-lg font-semibold"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      {t("save_changes")}
                    </>
                  ) : (
                    <>
                      <Edit className="w-5 h-5 mr-2" />
                      {t("edit_profile")}
                    </>
                  )}
                </Button>
              </div>

              {!isEditing && profileData.name === "Your Name" && (
                <Alert className="mb-4 glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 border-amber-200/50">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    👋 New here? Click <strong>"Edit Profile"</strong> to personalize your account with your name, email, and contact details.
                  </AlertDescription>
                </Alert>
              )}

              {isEditing && (
                <Alert className="mb-4 glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 border-blue-200/50">
                  <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    Edit your profile information below. Click "Save Changes" when done.
                  </AlertDescription>
                </Alert>
              )}

              {profileSaved && (
                <Alert className="mb-4 glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 border-green-200/50">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    ✅ {t("profile_updated")} - Changes saved permanently to your browser!
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 glass-card dark:bg-white/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground dark:text-gray-400">{t("name")}</p>
                      {isEditing ? (
                        <Input
                          value={profileData.name}
                          onChange={(e) => handleProfileChange("name", e.target.value)}
                          className="mt-1 glass-input dark:bg-white/10 dark:border-white/20"
                        />
                      ) : (
                        <p className="font-semibold text-foreground dark:text-gray-200">{profileData.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 glass-card dark:bg-white/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground dark:text-gray-400">{t("email")}</p>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange("email", e.target.value)}
                          className="mt-1 glass-input dark:bg-white/10 dark:border-white/20"
                        />
                      ) : (
                        <p className="font-semibold text-foreground dark:text-gray-200">{profileData.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role Field */}
                <div className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 glass-card dark:bg-white/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-secondary dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground dark:text-gray-400">{t("role")}</p>
                      {isEditing ? (
                        <Input
                          value={profileData.role}
                          onChange={(e) => handleProfileChange("role", e.target.value)}
                          className="mt-1 glass-input dark:bg-white/10 dark:border-white/20"
                        />
                      ) : (
                        <p className="font-semibold text-foreground dark:text-gray-200">{profileData.role}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone Field */}
                <div className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 glass-card dark:bg-white/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground dark:text-gray-400">{t("phone")}</p>
                      {isEditing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange("phone", e.target.value)}
                          className="mt-1 glass-input dark:bg-white/10 dark:border-white/20"
                        />
                      ) : (
                        <p className="font-semibold text-foreground dark:text-gray-200">{profileData.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    onClick={handleCancelEdit}
                    className="glass-button dark:bg-white/10 dark:border dark:border-white/20 px-6 py-3"
                  >
                    {t("cancel")}
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Preferences Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 glass-card dark:bg-white/20 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-accent dark:text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground dark:text-gray-200">{t("preferences")}</h3>
              </div>

              <div className="space-y-8">
                {/* Dark Mode Toggle */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? <Moon className="w-5 h-5 text-primary dark:text-green-400" /> : <Sun className="w-5 h-5 text-accent dark:text-yellow-400" />}
                    <h4 className="text-lg font-semibold text-foreground dark:text-gray-200">Dark Mode</h4>
                  </div>
                  <div className="pl-7">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Toggle between light and dark themes
                      </p>
                      <button
                        onClick={toggleDarkMode}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          theme === 'dark' ? 'bg-primary dark:bg-green-400' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-transform duration-300 ${
                          theme === 'dark' ? 'translate-x-7 bg-white' : 'translate-x-1 bg-white'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Language Preference */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary dark:text-green-400" />
                    <h4 className="text-lg font-semibold text-foreground dark:text-gray-200">{t("language_preference")}</h4>
                  </div>
                  <div className="pl-7">
                    <LanguageSelector />
                  </div>
                </div>

                {/* Weather Preference */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary dark:text-blue-400" />
                    <h4 className="text-lg font-semibold text-foreground dark:text-gray-200">{t("weather_preference")}</h4>
                  </div>
                  <div className="pl-7 space-y-3">
                    <Label htmlFor="defaultCity" className="text-sm font-semibold text-foreground dark:text-gray-200">
                      {t("default_city")}
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="defaultCity"
                        type="text"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        placeholder="e.g., Mumbai, Pune, Delhi"
                        className="flex-1 glass-input dark:bg-white/10 dark:border-white/20"
                        disabled={weatherLoading}
                      />
                      <Button
                        onClick={handleSaveCity}
                        disabled={weatherLoading || !cityInput}
                        className="glass-button-primary dark:bg-white/15 dark:backdrop-blur-lg dark:border dark:border-green-500/30 px-6"
                      >
                        {weatherLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : citySaved ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            {t("saved")}
                          </>
                        ) : (
                          t("save")
                        )}
                      </Button>
                    </div>
                    {weatherError && (
                      <Alert className="mt-2 glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 border-red-200/50">
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <AlertDescription className="text-red-800 dark:text-red-200">{weatherError}</AlertDescription>
                      </Alert>
                    )}
                    {defaultCity && !weatherError && (
                      <p className="text-xs text-muted-foreground dark:text-gray-400">
                        Current default: <span className="font-semibold text-accent dark:text-yellow-400">{defaultCity}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground dark:text-gray-400 mt-2">
                      💡 Weather data will be automatically fetched and saved for this city
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <Card className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-6 rounded-2xl">
              <p className="text-sm text-muted-foreground dark:text-gray-400 text-center">
                💡 {t("preferences_info")}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary dark:bg-green-600 text-primary-foreground dark:text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            <span className="font-bold">{t("app_title_full")}</span>
          </p>
          <p className="text-xs text-primary-foreground/70 dark:text-green-100 mt-2">
            {t("hackathon_tagline")}
          </p>
        </div>
      </footer>
    </div>
  )
}
