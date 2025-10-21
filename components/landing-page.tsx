"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ArrowRight, Leaf, TrendingUp, Zap, BarChart3, Brain, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/10 dark:bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-accent/10 dark:bg-yellow-500/20 rounded-full border border-accent/20 dark:border-yellow-500/30">
              <Sprout className="w-4 h-4 text-accent dark:text-yellow-400" />
              <span className="text-sm font-semibold text-accent dark:text-yellow-300">{t("ai_powered_agriculture")}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground dark:text-white mb-8 text-balance leading-tight">
              {t("grow_smarter_with")} <span className="text-primary dark:text-green-400">Indra Dhanu</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground dark:text-gray-300 mb-12 text-balance max-w-2xl mx-auto leading-relaxed">
              {t("hero_description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-accent-foreground dark:text-gray-900 font-bold text-lg px-8 py-6 rounded-lg btn-animate"
                onClick={() => onNavigate("recommendation")}
              >
                {t("get_started")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold text-lg px-8 py-6 rounded-lg border-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600 bg-transparent btn-animate"
                onClick={() => onNavigate("learn-more")}
              >
                {t("learn_more")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-20">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary dark:text-green-400 mb-2">98%</div>
                <p className="text-sm md:text-base text-muted-foreground dark:text-gray-400">{t("accuracy_rate")}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary dark:text-green-400 mb-2">50K+</div>
                <p className="text-sm md:text-base text-muted-foreground dark:text-gray-400">{t("farmers_helped")}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary dark:text-green-400 mb-2">₹2.5Cr</div>
                <p className="text-sm md:text-base text-muted-foreground dark:text-gray-400">{t("revenue_generated")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Content Section */}
      <section className="py-16 px-4 bg-background dark:bg-gray-900">
        <div className="max-w-6xl mx-auto w-full space-y-20">

          {/* Our Trained ML Model */}
          <div className="text-center bg-gradient-to-br from-background to-muted/30 dark:from-white/10 dark:to-white/5 dark:backdrop-blur-xl dark:border dark:border-white/20 p-16 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 text-balance">{t("our_trained_ml_model")}</h2>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto mb-12">
              {t("ml_model_description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-2">{t("advanced_neural_networks")}</h3>
                    <p className="text-muted-foreground dark:text-gray-400">
                      {t("neural_network_description")}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-secondary dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-2">{t("data_driven_insights")}</h3>
                    <p className="text-muted-foreground dark:text-gray-400">
                      {t("data_insights_description")}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-white/15 dark:to-white/10 dark:backdrop-blur-lg dark:border dark:border-green-500/30 p-6 rounded-xl">
                <Leaf className="w-8 h-8 text-primary dark:text-green-400 mb-4" />
                <h4 className="font-bold text-foreground dark:text-gray-200 mb-2">{t("crops_count")}</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {t("crops_description")}
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-white/15 dark:to-white/10 dark:backdrop-blur-lg dark:border dark:border-blue-500/30 p-6 rounded-xl">
                <TrendingUp className="w-8 h-8 text-secondary dark:text-blue-400 mb-4" />
                <h4 className="font-bold text-foreground dark:text-gray-200 mb-2">{t("real_time_analysis")}</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {t("real_time_description")}
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-white/15 dark:to-white/10 dark:backdrop-blur-lg dark:border dark:border-yellow-500/30 p-6 rounded-xl">
                <Zap className="w-8 h-8 text-accent dark:text-yellow-400 mb-4" />
                <h4 className="font-bold text-foreground dark:text-gray-200 mb-2">{t("profit_optimization")}</h4>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {t("profit_description")}
                </p>
              </Card>
            </div>
          </div>

          {/* Proven Performance */}
          <div className="text-center bg-gradient-to-br from-muted/20 to-muted/50 dark:from-white/10 dark:to-white/5 dark:backdrop-blur-xl dark:border dark:border-white/20 p-16 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 text-balance">{t("proven_performance")}</h2>
            <p className="text-lg text-muted-foreground dark:text-gray-300 mb-12">
              {t("performance_description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("prediction_accuracy")}</span>
                    <span className="text-primary dark:text-green-400 font-bold">98%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-3">
                    <div className="bg-primary dark:bg-green-400 h-3 rounded-full" style={{ width: "98%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("yield_improvement")}</span>
                    <span className="text-primary dark:text-green-400 font-bold">35%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-3">
                    <div className="bg-primary dark:bg-green-400 h-3 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("revenue_increase")}</span>
                    <span className="text-primary dark:text-green-400 font-bold">42%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-3">
                    <div className="bg-primary dark:bg-green-400 h-3 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("farmer_satisfaction")}</span>
                    <span className="text-primary dark:text-green-400 font-bold">96%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-3">
                    <div className="bg-primary dark:bg-green-400 h-3 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>
              </div>

              <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-foreground dark:text-gray-200 mb-6">{t("why_choose_indra_dhanu")}</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 dark:bg-yellow-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent dark:bg-yellow-400"></div>
                    </div>
                    <span className="text-muted-foreground dark:text-gray-300">
                      <strong className="text-foreground dark:text-gray-200">{t("scientifically_validated")}</strong> - {t("scientifically_validated_desc")}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 dark:bg-yellow-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent dark:bg-yellow-400"></div>
                    </div>
                    <span className="text-muted-foreground dark:text-gray-300">
                      <strong className="text-foreground dark:text-gray-200">{t("easy_to_use")}</strong> - {t("easy_to_use_desc")}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 dark:bg-yellow-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent dark:bg-yellow-400"></div>
                    </div>
                    <span className="text-muted-foreground dark:text-gray-300">
                      <strong className="text-foreground dark:text-gray-200">{t("real_time_support")}</strong> - {t("real_time_support_desc")}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 dark:bg-yellow-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent dark:bg-yellow-400"></div>
                    </div>
                    <span className="text-muted-foreground dark:text-gray-300">
                      <strong className="text-foreground dark:text-gray-200">{t("profit_focused")}</strong> - {t("profit_focused_desc")}
                    </span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Ready to Transform - CTA */}
          <div className="text-center bg-gradient-to-r from-primary to-primary/80 dark:from-white/15 dark:to-white/10 dark:backdrop-blur-xl dark:border dark:border-green-500/30 text-primary-foreground dark:text-white py-16 px-8 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("ready_to_transform")}</h2>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 dark:text-gray-200 text-balance max-w-2xl mx-auto">
              {t("transform_description")}
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-accent-foreground dark:text-gray-900 font-bold text-lg px-8 py-6 rounded-lg btn-animate"
              onClick={() => onNavigate("recommendation")}
            >
              {t("get_recommendation_now")} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
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
