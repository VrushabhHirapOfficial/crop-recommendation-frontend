"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Brain, Database, Zap, TrendingUp, Leaf, BarChart3, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LearnMorePage() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
              {t("how_ai_works")}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed">
              {t("ai_model_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Model Architecture Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t("model_architecture")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("model_architecture_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t("input_layer")}</h3>
              <p className="text-muted-foreground">
                {t("input_layer_desc")}
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t("hidden_layers")}</h3>
              <p className="text-muted-foreground">
                {t("hidden_layers_desc")}
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t("output_layer")}</h3>
              <p className="text-muted-foreground">
                {t("output_layer_desc")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Data Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t("training_validation")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("training_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">{t("training_records")}</h4>
                  <p className="text-muted-foreground">
                    {t("training_records_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">{t("cross_validation")}</h4>
                  <p className="text-muted-foreground">
                    {t("cross_validation_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">{t("hyperparameter_tuning")}</h4>
                  <p className="text-muted-foreground">
                    {t("hyperparameter_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">{t("real_world_testing")}</h4>
                  <p className="text-muted-foreground">
                    {t("real_world_testing_desc")}
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-card border border-border p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-8">{t("performance_metrics")}</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">{t("accuracy")}</span>
                    <span className="text-accent font-bold">98%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "98%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">{t("precision")}</span>
                    <span className="text-accent font-bold">96%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">{t("recall")}</span>
                    <span className="text-accent font-bold">94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "94%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">{t("f1_score")}</span>
                    <span className="text-accent font-bold">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t("advanced_features")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("advanced_features_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("market_price_integration")}</h3>
                  <p className="text-muted-foreground">
                    {t("market_price_desc")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("seasonal_adaptation")}</h3>
                  <p className="text-muted-foreground">
                    {t("seasonal_adaptation_desc")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("yield_prediction")}</h3>
                  <p className="text-muted-foreground">
                    {t("yield_prediction_desc")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("real_time_updates")}</h3>
                  <p className="text-muted-foreground">
                    {t("real_time_updates_desc")}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("ready_to_get_started")}</h2>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 text-balance">
            {t("get_started_desc")}
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-lg btn-animate"
            onClick={() => {
              const tabs = document.querySelector('[value="recommendation"]') as HTMLElement
              tabs?.click()
            }}
          >
            {t("get_recommendation")} <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            <span className="font-bold">{t("app_title_full")}</span>
          </p>
          <p className="text-xs text-primary-foreground/70 mt-2">
            {t("hackathon_tagline")}
          </p>
        </div>
      </footer>
    </div>
  )
}
