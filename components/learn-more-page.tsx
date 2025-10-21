"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Brain, Database, Zap, TrendingUp, Leaf, BarChart3, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LearnMorePage({ onNavigate }: { onNavigate: (tab: string) => void }) {
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
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground dark:text-white mb-8 text-balance leading-tight">
              {t("how_ai_works")}
            </h1>

            <p className="text-2xl md:text-3xl text-muted-foreground dark:text-white mb-8 text-balance max-w-2xl mx-auto leading-relaxed font-medium">
              {t("ai_model_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Model Architecture Section */}
      <section className="py-16 px-4 bg-background dark:bg-gray-900">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 text-balance">{t("model_architecture")}</h2>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              {t("model_architecture_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-primary/20 dark:bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-7 h-7 text-primary dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-3">{t("input_layer")}</h3>
              <p className="text-muted-foreground dark:text-gray-400">
                {t("input_layer_desc")}
              </p>
            </Card>

            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-secondary/20 dark:bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-secondary dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-3">{t("hidden_layers")}</h3>
              <p className="text-muted-foreground dark:text-gray-400">
                {t("hidden_layers_desc")}
              </p>
            </Card>

            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-accent/20 dark:bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-accent dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-3">{t("output_layer")}</h3>
              <p className="text-muted-foreground dark:text-gray-400">
                {t("output_layer_desc")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Data Section */}
      <section className="py-16 px-4 bg-muted/30 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 text-balance">{t("training_validation")}</h2>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              {t("training_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 dark:bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-gray-200 mb-2">{t("training_records")}</h4>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("training_records_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary/20 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-secondary dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-gray-200 mb-2">{t("cross_validation")}</h4>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("cross_validation_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/20 dark:bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-accent dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-gray-200 mb-2">{t("hyperparameter_tuning")}</h4>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("hyperparameter_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 dark:bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-gray-200 mb-2">{t("real_world_testing")}</h4>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("real_world_testing_desc")}
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground dark:text-gray-200 mb-8">{t("performance_metrics")}</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("accuracy")}</span>
                    <span className="text-accent dark:text-yellow-400 font-bold">98%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-accent dark:bg-yellow-400 h-2 rounded-full" style={{ width: "98%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("precision")}</span>
                    <span className="text-accent dark:text-yellow-400 font-bold">96%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-accent dark:bg-yellow-400 h-2 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("recall")}</span>
                    <span className="text-accent dark:text-yellow-400 font-bold">94%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-accent dark:bg-yellow-400 h-2 rounded-full" style={{ width: "94%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground dark:text-gray-200">{t("f1_score")}</span>
                    <span className="text-accent dark:text-yellow-400 font-bold">95%</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-accent dark:bg-yellow-400 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 bg-background dark:bg-gray-900">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 text-balance">{t("advanced_features")}</h2>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              {t("advanced_features_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 dark:bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-2">{t("market_price_integration")}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("market_price_desc")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-secondary dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-2">{t("seasonal_adaptation")}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("seasonal_adaptation_desc")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 dark:bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-accent dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-2">{t("yield_prediction")}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("yield_prediction_desc")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 dark:bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-2">{t("real_time_updates")}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("real_time_updates_desc")}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#1DB954] text-white">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">{t("ready_to_get_started")}</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 text-balance">
            {t("get_started_desc")}
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-accent-foreground dark:text-gray-900 font-bold text-lg px-8 py-6 rounded-lg btn-animate"
            onClick={() => onNavigate("recommendation")}
          >
            {t("get_recommendation")} <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
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
