"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { usePreferences } from "@/context/PreferencesContext"
import { getWeatherByCity } from "@/services/weather"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import { User, Mail, Briefcase, MapPin, Check, Settings, Globe, Edit, Phone, Loader2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  const { t } = useTranslation()
  const { defaultCity, setDefaultCity, userProfile, updateUserProfile } = usePreferences()
  
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
      <section className="relative min-h-screen px-4 py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              {t("user_profile")}
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              {isEditing ? t("edit_profile") : "Manage your profile and preferences"}
            </p>
          </motion.div>

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass card-glass p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                    <p className="text-muted-foreground">
                      {profileData.name === "Your Name" 
                        ? "👋 Welcome! Click 'Edit Profile' to get started" 
                        : "Welcome back!"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl btn-animate"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {t("save_changes")}
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      {t("edit_profile")}
                    </>
                  )}
                </Button>
              </div>

              {!isEditing && profileData.name === "Your Name" && (
                <Alert className="mb-4 bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    👋 New here? Click <strong>"Edit Profile"</strong> to personalize your account with your name, email, and contact details.
                  </AlertDescription>
                </Alert>
              )}

              {isEditing && (
                <Alert className="mb-4 bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Edit your profile information below. Click "Save Changes" when done.
                  </AlertDescription>
                </Alert>
              )}

              {profileSaved && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    ✅ {t("profile_updated")} - Changes saved permanently to your browser!
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{t("name")}</p>
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => handleProfileChange("name", e.target.value)}
                        className="mt-1 bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="font-semibold text-foreground">{profileData.name}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{t("email")}</p>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        className="mt-1 bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="font-semibold text-foreground">{profileData.email}</p>
                    )}
                  </div>
                </div>

                {/* Role Field */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{t("role")}</p>
                    {isEditing ? (
                      <Input
                        value={profileData.role}
                        onChange={(e) => handleProfileChange("role", e.target.value)}
                        className="mt-1 bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="font-semibold text-foreground">{profileData.role}</p>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{t("phone")}</p>
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
                        className="mt-1 bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="font-semibold text-foreground">{profileData.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="rounded-xl"
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
            <Card className="glass card-glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t("preferences")}</h3>
              </div>

              <div className="space-y-8">
                {/* Language Preference */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <h4 className="text-lg font-semibold text-foreground">{t("language_preference")}</h4>
                  </div>
                  <div className="pl-7">
                    <LanguageSelector />
                  </div>
                </div>

                {/* Weather Preference */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <h4 className="text-lg font-semibold text-foreground">{t("weather_preference")}</h4>
                  </div>
                  <div className="pl-7 space-y-3">
                    <Label htmlFor="defaultCity" className="text-sm font-semibold text-foreground">
                      {t("default_city")}
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="defaultCity"
                        type="text"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        placeholder="e.g., Mumbai, Pune, Delhi"
                        className="flex-1 bg-white/5 border-white/20 rounded-xl"
                        disabled={weatherLoading}
                      />
                      <Button
                        onClick={handleSaveCity}
                        disabled={weatherLoading || !cityInput}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 rounded-xl btn-animate"
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
                      <Alert className="mt-2 bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">{weatherError}</AlertDescription>
                      </Alert>
                    )}
                    {defaultCity && !weatherError && (
                      <p className="text-xs text-muted-foreground">
                        Current default: <span className="font-semibold text-accent">{defaultCity}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
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
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-6 rounded-2xl">
              <p className="text-sm text-muted-foreground text-center">
                💡 {t("preferences_info")}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
