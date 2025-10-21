"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LandingPage from "@/components/landing-page"
import RecommendationPage from "@/components/recommendation-page"
import LearnMorePage from "@/components/learn-more-page"
import ProfilePage from "@/components/profile-page"
import AboutUsPage from "@/components/about-us-page"
import LanguageSwitcher from "@/components/language-switcher"

export default function Home() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("landing")
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (orb1Ref.current) {
          orb1Ref.current.style.transform = `translate(${mousePositionRef.current.x * 0.02}px, ${mousePositionRef.current.y * 0.02}px)`
        }
        if (orb2Ref.current) {
          orb2Ref.current.style.transform = `translate(${mousePositionRef.current.x * -0.02}px, ${mousePositionRef.current.y * -0.02}px)`
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced glassmorphism background */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-cyan-50 via-emerald-50 to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>

        {/* Animated orbs with glassmorphism effects */}
        <div
          ref={orb1Ref}
          className="absolute w-96 h-96 bg-gradient-to-br from-primary-200/30 via-accent-200/20 to-secondary-200/30 dark:from-white/10 dark:via-white/5 dark:to-white/5 rounded-full blur-3xl animate-float"
          style={{
            top: "10%",
            left: "10%",
          }}
        ></div>
        <div
          ref={orb2Ref}
          className="absolute w-96 h-96 bg-gradient-to-br from-secondary-200/30 via-primary-200/20 to-accent-200/30 dark:from-white/10 dark:via-white/5 dark:to-white/5 rounded-full blur-3xl animate-float"
          style={{
            top: "60%",
            right: "10%",
            animationDelay: "2s",
          }}
        ></div>

        {/* Additional floating elements */}
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 dark:from-white/5 dark:to-white/5 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: "4s" }}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 dark:from-white/5 dark:to-white/5 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: "6s" }}></div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col min-h-screen relative z-10">
        {/* Enhanced glassmorphism header */}
        <div className="sticky top-0 z-50 bg-white/10 dark:bg-white/10 backdrop-blur-xl border-b border-white/20 dark:border-white/20">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-between py-2 sm:py-4">
              <TabsList className="flex-1 justify-start rounded-none bg-transparent p-0 h-auto gap-1.5 sm:gap-3 overflow-x-auto flex-nowrap">
                <TabsTrigger
                  value="landing"
                  className="bg-transparent hover:bg-white/10 data-[state=active]:bg-green-200 data-[state=active]:text-green-800 data-[state=active]:font-semibold data-[state=active]:rounded-full data-[state=active]:px-3 data-[state=active]:py-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white dark:data-[state=active]:font-bold"
                >
                  {t("home")}
                </TabsTrigger>
                <TabsTrigger
                  value="learn-more"
                  className="bg-transparent hover:bg-white/10 data-[state=active]:bg-green-200 data-[state=active]:text-green-800 data-[state=active]:font-semibold data-[state=active]:rounded-full data-[state=active]:px-3 data-[state=active]:py-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white dark:data-[state=active]:font-bold"
                >
                  {t("learn_more")}
                </TabsTrigger>
                <TabsTrigger
                  value="recommendation"
                  className="bg-transparent hover:bg-white/10 data-[state=active]:bg-green-200 data-[state=active]:text-green-800 data-[state=active]:font-semibold data-[state=active]:rounded-full data-[state=active]:px-3 data-[state=active]:py-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white dark:data-[state=active]:font-bold"
                >
                  {t("get_recommendation")}
                </TabsTrigger>
                <TabsTrigger
                  value="about-us"
                  className="bg-transparent hover:bg-white/10 data-[state=active]:bg-green-200 data-[state=active]:text-green-800 data-[state=active]:font-semibold data-[state=active]:rounded-full data-[state=active]:px-3 data-[state=active]:py-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white dark:data-[state=active]:font-bold"
                >
                  {t("about_us")}
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="bg-transparent hover:bg-white/10 data-[state=active]:bg-green-200 data-[state=active]:text-green-800 data-[state=active]:font-semibold data-[state=active]:rounded-full data-[state=active]:px-3 data-[state=active]:py-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-white dark:data-[state=active]:font-bold"
                >
                  {t("profile")}
                </TabsTrigger>
              </TabsList>
              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        <TabsContent value="landing" className="flex-1 m-0">
          <LandingPage onNavigate={setActiveTab} />
        </TabsContent>

        <TabsContent value="learn-more" className="flex-1 m-0">
          <LearnMorePage onNavigate={setActiveTab} />
        </TabsContent>

        <TabsContent value="recommendation" className="flex-1 m-0">
          <RecommendationPage />
        </TabsContent>

        <TabsContent value="about-us" className="flex-1 m-0">
          <AboutUsPage />
        </TabsContent>

        <TabsContent value="profile" className="flex-1 m-0">
          <ProfilePage />
        </TabsContent>
      </Tabs>
    </main>
  )
}
