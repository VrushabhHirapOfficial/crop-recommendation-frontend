"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LandingPage from "@/components/landing-page"
import RecommendationPage from "@/components/recommendation-page"
import LearnMorePage from "@/components/learn-more-page"
import ProfilePage from "@/components/profile-page"

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
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-transparent to-blue-100/30 animate-pulse"></div>
        <div
          ref={orb1Ref}
          className="absolute w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float"
          style={{
            top: "10%",
            left: "10%",
          }}
        ></div>
        <div
          ref={orb2Ref}
          className="absolute w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float"
          style={{
            top: "60%",
            right: "10%",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col min-h-screen relative z-10">
        <div className="sticky top-0 z-50 glass-dark backdrop-blur-3xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto gap-1.5 sm:gap-3 py-2 sm:py-4 overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="landing"
                className="glass-tab data-[state=active]:glass-tab-active px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 btn-animate text-xs sm:text-sm whitespace-nowrap"
              >
                {t("home")}
              </TabsTrigger>
              <TabsTrigger
                value="learn-more"
                className="glass-tab data-[state=active]:glass-tab-active px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 btn-animate text-xs sm:text-sm whitespace-nowrap"
              >
                {t("learn_more")}
              </TabsTrigger>
              <TabsTrigger
                value="recommendation"
                className="glass-tab data-[state=active]:glass-tab-active px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 btn-animate text-xs sm:text-sm whitespace-nowrap"
              >
                {t("get_recommendation")}
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="glass-tab data-[state=active]:glass-tab-active px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 btn-animate text-xs sm:text-sm whitespace-nowrap"
              >
                {t("profile")}
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="landing" className="flex-1 m-0">
          <LandingPage onNavigate={setActiveTab} />
        </TabsContent>

        <TabsContent value="learn-more" className="flex-1 m-0">
          <LearnMorePage />
        </TabsContent>

        <TabsContent value="recommendation" className="flex-1 m-0">
          <RecommendationPage />
        </TabsContent>

        <TabsContent value="profile" className="flex-1 m-0">
          <ProfilePage />
        </TabsContent>
      </Tabs>
    </main>
  )
}
