"use client"

import { useState, useRef, useEffect } from "react"
import Header from "@/components/header"
import CropForm from "@/components/crop-form"
import ResultsDisplay from "@/components/results-display"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

interface CropResult {
  crop: string
  confidence: number
  yield_kg_per_hectare: number
  price_per_quintal: number
  estimated_revenue: number
}

interface ApiResponse {
  success: boolean
  crop: string
  confidence: number
  yield_kg_per_hectare: number
  price_per_quintal: number
  estimated_revenue: number
}

export default function RecommendationPage() {
  const [results, setResults] = useState<CropResult | null>(null)
  const [topThree, setTopThree] = useState<CropResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weatherFetched, setWeatherFetched] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (formData: {
    nitrogen: number
    phosphorus: number
    potassium: number
    temperature: number
    humidity: number
    ph_value: number
    rainfall: number
  }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://crop-recommendation-api-vudg.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get crop recommendation")
      }

      const data: ApiResponse = await response.json()

      if (data.success) {
        setResults({
          crop: data.crop,
          confidence: data.confidence,
          yield_kg_per_hectare: data.yield_kg_per_hectare,
          price_per_quintal: data.price_per_quintal,
          estimated_revenue: data.estimated_revenue,
        })

        setTopThree([
          data,
          {
            crop: data.crop,
            confidence: Math.max(0, data.confidence - 5),
            yield_kg_per_hectare: data.yield_kg_per_hectare * 0.95,
            price_per_quintal: data.price_per_quintal * 0.98,
            estimated_revenue: data.estimated_revenue * 0.93,
          },
          {
            crop: data.crop,
            confidence: Math.max(0, data.confidence - 10),
            yield_kg_per_hectare: data.yield_kg_per_hectare * 0.9,
            price_per_quintal: data.price_per_quintal * 0.96,
            estimated_revenue: data.estimated_revenue * 0.86,
          },
        ])

        // Auto-scroll to results after a short delay
        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setResults(null)
      setTopThree([])
    } finally {
      setLoading(false)
    }
  }

  const handleWeatherFetch = () => {
    setWeatherFetched(true)
    // Add animation to temperature, humidity, and rainfall inputs
    setTimeout(() => {
      setWeatherFetched(false)
    }, 2000)
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced glassmorphism background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-cyan-50 via-emerald-50 to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>

        {/* Animated floating elements */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 dark:from-white/5 dark:to-white/5 rounded-full blur-2xl animate-float opacity-60"></div>
        <div className="absolute bottom-32 right-1/3 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 dark:from-white/5 dark:to-white/5 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: "3s" }}></div>
      </div>

      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10">
        <motion.div
          className="w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CropForm onSubmit={handleSubmit} loading={loading} onWeatherFetch={handleWeatherFetch} weatherFetched={weatherFetched} />
        </motion.div>

        {error && (
          <motion.div
            className="mt-8 glass-card p-6 rounded-2xl max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-red-400 text-lg font-semibold">{error}</div>
          </motion.div>
        )}

        {results && (
          <motion.div
            ref={resultsRef}
            className="mt-12 w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResultsDisplay topCrop={results} topThree={topThree} />
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  )
}
