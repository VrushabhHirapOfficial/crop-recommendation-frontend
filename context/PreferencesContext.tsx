"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface UserProfile {
  name: string
  email: string
  role: string
  phone: string
}

interface PreferencesContextType {
  defaultCity: string
  setDefaultCity: (city: string) => void
  userProfile: UserProfile
  updateUserProfile: (profile: UserProfile) => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

const defaultProfile: UserProfile = {
  name: "Your Name",
  email: "your.email@example.com",
  role: "Farmer",
  phone: "+91 00000 00000",
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [defaultCity, setDefaultCityState] = useState<string>("")
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCity = localStorage.getItem("indra-dhanu-default-city")
      const savedProfile = localStorage.getItem("indra-dhanu-user-profile")

      if (savedCity) {
        setDefaultCityState(savedCity)
      }

      if (savedProfile) {
        try {
          setUserProfile(JSON.parse(savedProfile))
        } catch (e) {
          console.error("Failed to parse user profile", e)
        }
      }

      setIsInitialized(true)
    }
  }, [])

  const setDefaultCity = (city: string) => {
    setDefaultCityState(city)
    if (typeof window !== "undefined") {
      localStorage.setItem("indra-dhanu-default-city", city)
    }
  }

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile)
    if (typeof window !== "undefined") {
      localStorage.setItem("indra-dhanu-user-profile", JSON.stringify(profile))
    }
  }

  // Prevent hydration mismatch by only rendering children after initialization
  if (!isInitialized) {
    return null
  }

  return (
    <PreferencesContext.Provider
      value={{
        defaultCity,
        setDefaultCity,
        userProfile,
        updateUserProfile,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
