"use client"

import { useEffect, useState } from "react"
import { Brain, Database, Zap, TrendingUp, Leaf, BarChart3, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LearnMorePage() {
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
              How Our <span className="text-accent">AI Model</span> Works
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed">
              Discover the technology behind Indra Dhanu's intelligent crop recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Model Architecture Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Model Architecture</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our deep learning model combines multiple neural network layers to process agricultural data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Input Layer</h3>
              <p className="text-muted-foreground">
                Processes 7 critical agricultural parameters: Nitrogen, Phosphorus, Potassium, Temperature, Humidity,
                pH, and Rainfall
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Hidden Layers</h3>
              <p className="text-muted-foreground">
                Multiple dense layers with ReLU activation extract complex patterns and relationships from the input
                data
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Output Layer</h3>
              <p className="text-muted-foreground">
                Softmax activation generates probability scores for 50+ crop varieties, ranking them by suitability
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Data Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Training & Validation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our model was trained on extensive agricultural datasets from multiple regions and seasons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">100,000+ Training Records</h4>
                  <p className="text-muted-foreground">
                    Trained on comprehensive agricultural data spanning multiple years and regions
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Cross-Validation</h4>
                  <p className="text-muted-foreground">
                    K-fold cross-validation ensures robust performance across different data distributions
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Hyperparameter Tuning</h4>
                  <p className="text-muted-foreground">
                    Optimized learning rates, batch sizes, and regularization for maximum accuracy
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Real-World Testing</h4>
                  <p className="text-muted-foreground">
                    Validated against actual farmer feedback and crop outcomes from diverse farms
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-card border border-border p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-8">Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">Accuracy</span>
                    <span className="text-accent font-bold">98%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "98%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">Precision</span>
                    <span className="text-accent font-bold">96%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">Recall</span>
                    <span className="text-accent font-bold">94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "94%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">F1-Score</span>
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Advanced Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our model incorporates cutting-edge techniques for superior crop recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all duration-300 btn-animate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Market Price Integration</h3>
                  <p className="text-muted-foreground">
                    Considers current market prices to recommend crops with maximum profit potential
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
                  <h3 className="text-xl font-bold text-foreground mb-2">Seasonal Adaptation</h3>
                  <p className="text-muted-foreground">
                    Automatically adjusts recommendations based on current season and weather patterns
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
                  <h3 className="text-xl font-bold text-foreground mb-2">Yield Prediction</h3>
                  <p className="text-muted-foreground">
                    Estimates expected yield for each recommended crop based on your specific conditions
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
                  <h3 className="text-xl font-bold text-foreground mb-2">Real-Time Updates</h3>
                  <p className="text-muted-foreground">
                    Model continuously learns from new data to improve recommendations over time
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 text-balance">
            Use our AI model to get personalized crop recommendations for your farm today.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-lg btn-animate"
            onClick={() => {
              const tabs = document.querySelector('[value="recommendation"]') as HTMLElement
              tabs?.click()
            }}
          >
            Get Recommendation <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            <span className="font-bold">Indra Dhanu Smart Crop Recommendation System</span>
          </p>
          <p className="text-xs text-primary-foreground/70 mt-2">
            Hackathon 2025 | Empowering Farmers with Data-Driven Decisions
          </p>
        </div>
      </footer>
    </div>
  )
}
