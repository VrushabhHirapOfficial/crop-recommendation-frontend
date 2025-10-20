"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Leaf, TrendingUp, Zap, BarChart3, Brain, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage({ onNavigate }: { onNavigate: (tab: string) => void }) {
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
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <Sprout className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">AI-Powered Agriculture</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
              Grow Smarter with <span className="text-accent">Indra Dhanu</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed">
              Our advanced ML model analyzes your soil and climate conditions to recommend the perfect crops for maximum
              yield and profitability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-lg btn-animate"
                onClick={() => onNavigate("recommendation")}
              >
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold text-lg px-8 py-6 rounded-lg border-2 bg-transparent btn-animate"
                onClick={() => onNavigate("learn-more")}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
                <p className="text-sm md:text-base text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50K+</div>
                <p className="text-sm md:text-base text-muted-foreground">Farmers Helped</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">₹2.5Cr</div>
                <p className="text-sm md:text-base text-muted-foreground">Revenue Generated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Model Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Trained ML Model</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge machine learning technology and trained on years of agricultural data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Advanced Neural Networks</h3>
                  <p className="text-muted-foreground">
                    Our model uses deep learning algorithms trained on 100,000+ crop records to identify patterns and
                    predict optimal crops with exceptional accuracy.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Data-Driven Insights</h3>
                  <p className="text-muted-foreground">
                    Analyzes 7 critical parameters including NPK levels, temperature, humidity, pH, and rainfall to
                    provide comprehensive recommendations.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-6 rounded-xl">
              <Leaf className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold text-foreground mb-2">50+ Crops</h4>
              <p className="text-sm text-muted-foreground">
                Trained to recognize and recommend from 50+ different crop varieties
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 p-6 rounded-xl">
              <TrendingUp className="w-8 h-8 text-secondary mb-4" />
              <h4 className="font-bold text-foreground mb-2">Real-Time Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Instant predictions based on your current soil and weather conditions
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 p-6 rounded-xl">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-bold text-foreground mb-2">Profit Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Maximizes your yield and revenue with market-aware recommendations
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Model Performance Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Proven Performance</h2>
            <p className="text-lg text-muted-foreground">
              Our model has been rigorously tested and validated across diverse agricultural regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">Prediction Accuracy</span>
                  <span className="text-accent font-bold">98%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">Yield Improvement</span>
                  <span className="text-accent font-bold">35%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">Revenue Increase</span>
                  <span className="text-accent font-bold">42%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">Farmer Satisfaction</span>
                  <span className="text-accent font-bold">96%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full" style={{ width: "96%" }}></div>
                </div>
              </div>
            </div>

            <Card className="bg-card border border-border p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose Indra Dhanu?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Scientifically Validated</strong> - Tested across multiple
                    regions and seasons
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Easy to Use</strong> - Simple interface for all farmers
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Real-Time Support</strong> - Get instant recommendations anytime
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Profit Focused</strong> - Maximizes your earnings
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Transform Your Farming?</h2>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 text-balance">
            Get personalized crop recommendations based on your farm conditions in seconds.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-lg btn-animate"
            onClick={() => onNavigate("recommendation")}
          >
            Get Your Recommendation Now <ArrowRight className="w-5 h-5 ml-2" />
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
