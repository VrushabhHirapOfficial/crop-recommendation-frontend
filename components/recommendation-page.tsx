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

        // Generate alternative crop suggestions based on the primary crop
        const alternativeCrops = getAlternativeCrops(data.crop, data)

        setTopThree(alternativeCrops)

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

// Alternative crops mapping based on similar growing conditions
const CROP_ALTERNATIVES: Record<string, Array<{crop: string, confidenceAdjustment: number, yieldMultiplier: number, priceMultiplier: number, revenueMultiplier: number}>> = {
  "muskmelon": [
    { crop: "watermelon", confidenceAdjustment: -8, yieldMultiplier: 1.1, priceMultiplier: 0.85, revenueMultiplier: 0.95 },
    { crop: "papaya", confidenceAdjustment: -12, yieldMultiplier: 0.9, priceMultiplier: 1.2, revenueMultiplier: 1.08 }
  ],
  "watermelon": [
    { crop: "muskmelon", confidenceAdjustment: -8, yieldMultiplier: 0.9, priceMultiplier: 1.15, revenueMultiplier: 1.05 },
    { crop: "cucumber", confidenceAdjustment: -10, yieldMultiplier: 1.2, priceMultiplier: 0.7, revenueMultiplier: 0.84 }
  ],
  "papaya": [
    { crop: "banana", confidenceAdjustment: -10, yieldMultiplier: 1.3, priceMultiplier: 0.8, revenueMultiplier: 1.04 },
    { crop: "guava", confidenceAdjustment: -15, yieldMultiplier: 0.8, priceMultiplier: 1.4, revenueMultiplier: 1.12 }
  ],
  "rice": [
    { crop: "wheat", confidenceAdjustment: -5, yieldMultiplier: 0.8, priceMultiplier: 1.25, revenueMultiplier: 1.0 },
    { crop: "maize", confidenceAdjustment: -8, yieldMultiplier: 1.1, priceMultiplier: 0.9, revenueMultiplier: 0.99 }
  ],
  "wheat": [
    { crop: "rice", confidenceAdjustment: -5, yieldMultiplier: 1.25, priceMultiplier: 0.8, revenueMultiplier: 1.0 },
    { crop: "barley", confidenceAdjustment: -10, yieldMultiplier: 0.9, priceMultiplier: 1.1, revenueMultiplier: 0.99 }
  ],
  "maize": [
    { crop: "rice", confidenceAdjustment: -8, yieldMultiplier: 0.9, priceMultiplier: 1.1, revenueMultiplier: 0.99 },
    { crop: "sorghum", confidenceAdjustment: -12, yieldMultiplier: 0.8, priceMultiplier: 1.2, revenueMultiplier: 0.96 }
  ],
  "cotton": [
    { crop: "sugarcane", confidenceAdjustment: -10, yieldMultiplier: 1.5, priceMultiplier: 0.6, revenueMultiplier: 0.9 },
    { crop: "soybean", confidenceAdjustment: -8, yieldMultiplier: 0.7, priceMultiplier: 1.3, revenueMultiplier: 0.91 }
  ],
  "sugarcane": [
    { crop: "cotton", confidenceAdjustment: -10, yieldMultiplier: 0.67, priceMultiplier: 1.67, revenueMultiplier: 1.11 },
    { crop: "maize", confidenceAdjustment: -12, yieldMultiplier: 0.8, priceMultiplier: 1.1, revenueMultiplier: 0.88 }
  ],
  "potato": [
    { crop: "tomato", confidenceAdjustment: -8, yieldMultiplier: 1.2, priceMultiplier: 0.9, revenueMultiplier: 1.08 },
    { crop: "onion", confidenceAdjustment: -10, yieldMultiplier: 0.9, priceMultiplier: 1.2, revenueMultiplier: 1.08 }
  ],
  "tomato": [
    { crop: "potato", confidenceAdjustment: -8, yieldMultiplier: 0.83, priceMultiplier: 1.11, revenueMultiplier: 0.93 },
    { crop: "chilli", confidenceAdjustment: -12, yieldMultiplier: 0.7, priceMultiplier: 1.5, revenueMultiplier: 1.05 }
  ],
  "banana": [
    { crop: "papaya", confidenceAdjustment: -10, yieldMultiplier: 0.77, priceMultiplier: 1.25, revenueMultiplier: 0.96 },
    { crop: "coconut", confidenceAdjustment: -15, yieldMultiplier: 0.5, priceMultiplier: 2.0, revenueMultiplier: 1.0 }
  ],
  "mango": [
    { crop: "guava", confidenceAdjustment: -12, yieldMultiplier: 0.8, priceMultiplier: 1.2, revenueMultiplier: 0.96 },
    { crop: "orange", confidenceAdjustment: -15, yieldMultiplier: 0.7, priceMultiplier: 1.4, revenueMultiplier: 0.98 }
  ],
  "orange": [
    { crop: "lemon", confidenceAdjustment: -10, yieldMultiplier: 1.1, priceMultiplier: 0.9, revenueMultiplier: 0.99 },
    { crop: "mango", confidenceAdjustment: -15, yieldMultiplier: 0.7, priceMultiplier: 1.3, revenueMultiplier: 0.91 }
  ],
  "coconut": [
    { crop: "arecanut", confidenceAdjustment: -12, yieldMultiplier: 0.8, priceMultiplier: 1.2, revenueMultiplier: 0.96 },
    { crop: "banana", confidenceAdjustment: -15, yieldMultiplier: 2.0, priceMultiplier: 0.5, revenueMultiplier: 1.0 }
  ],
  "grapes": [
    { crop: "pomegranate", confidenceAdjustment: -10, yieldMultiplier: 0.8, priceMultiplier: 1.3, revenueMultiplier: 1.04 },
    { crop: "orange", confidenceAdjustment: -12, yieldMultiplier: 0.9, priceMultiplier: 1.1, revenueMultiplier: 0.99 }
  ],
  "pomegranate": [
    { crop: "grapes", confidenceAdjustment: -10, yieldMultiplier: 1.25, priceMultiplier: 0.8, revenueMultiplier: 1.0 },
    { crop: "guava", confidenceAdjustment: -12, yieldMultiplier: 0.9, priceMultiplier: 1.1, revenueMultiplier: 0.99 }
  ],
  "apple": [
    { crop: "pear", confidenceAdjustment: -12, yieldMultiplier: 0.9, priceMultiplier: 1.1, revenueMultiplier: 0.99 },
    { crop: "peach", confidenceAdjustment: -15, yieldMultiplier: 0.8, priceMultiplier: 1.2, revenueMultiplier: 0.96 }
  ],
  "chickpea": [
    { crop: "lentil", confidenceAdjustment: -8, yieldMultiplier: 0.9, priceMultiplier: 1.1, revenueMultiplier: 0.99 },
    { crop: "pea", confidenceAdjustment: -10, yieldMultiplier: 0.8, priceMultiplier: 1.2, revenueMultiplier: 0.96 }
  ],
  "blackgram": [
    { crop: "greengram", confidenceAdjustment: -8, yieldMultiplier: 1.1, priceMultiplier: 0.9, revenueMultiplier: 0.99 },
    { crop: "chickpea", confidenceAdjustment: -10, yieldMultiplier: 1.2, priceMultiplier: 0.8, revenueMultiplier: 0.96 }
  ],
  "mothbeans": [
    { crop: "blackgram", confidenceAdjustment: -10, yieldMultiplier: 1.1, priceMultiplier: 0.9, revenueMultiplier: 0.99 },
    { crop: "greengram", confidenceAdjustment: -12, yieldMultiplier: 1.2, priceMultiplier: 0.8, revenueMultiplier: 0.96 }
  ],
  "lentil": [
    { crop: "chickpea", confidenceAdjustment: -8, yieldMultiplier: 1.2, priceMultiplier: 0.8, revenueMultiplier: 0.96 },
    { crop: "pea", confidenceAdjustment: -10, yieldMultiplier: 0.9, priceMultiplier: 1.1, revenueMultiplier: 0.99 }
  ]
}

/**
 * Generate alternative crop suggestions based on the primary crop recommendation
 */
function getAlternativeCrops(primaryCrop: string, primaryData: ApiResponse) {
  const normalizedPrimaryCrop = primaryCrop.toLowerCase()

  // Get alternative crops for this primary crop
  const alternatives = CROP_ALTERNATIVES[normalizedPrimaryCrop]

  if (!alternatives || alternatives.length < 2) {
    // Fallback for crops not in mapping - create generic alternatives
    return [
      primaryData, // Primary crop (Option 1)
      {
        crop: `${primaryCrop} (High Yield)`,
        confidence: Math.max(0, primaryData.confidence - 8),
        yield_kg_per_hectare: Math.round(primaryData.yield_kg_per_hectare * 1.1),
        price_per_quintal: Math.round(primaryData.price_per_quintal * 0.9),
        estimated_revenue: Math.round(primaryData.estimated_revenue * 0.99),
      },
      {
        crop: `${primaryCrop} (Premium)`,
        confidence: Math.max(0, primaryData.confidence - 12),
        yield_kg_per_hectare: Math.round(primaryData.yield_kg_per_hectare * 0.8),
        price_per_quintal: Math.round(primaryData.price_per_quintal * 1.3),
        estimated_revenue: Math.round(primaryData.estimated_revenue * 1.04),
      }
    ]
  }

  // Generate the top 3 crops including the primary
  return [
    primaryData, // Primary crop (Option 1)
    {
      crop: alternatives[0].crop,
      confidence: Math.max(0, primaryData.confidence + alternatives[0].confidenceAdjustment),
      yield_kg_per_hectare: Math.round(primaryData.yield_kg_per_hectare * alternatives[0].yieldMultiplier),
      price_per_quintal: Math.round(primaryData.price_per_quintal * alternatives[0].priceMultiplier),
      estimated_revenue: Math.round(primaryData.estimated_revenue * alternatives[0].revenueMultiplier),
    },
    {
      crop: alternatives[1].crop,
      confidence: Math.max(0, primaryData.confidence + alternatives[1].confidenceAdjustment),
      yield_kg_per_hectare: Math.round(primaryData.yield_kg_per_hectare * alternatives[1].yieldMultiplier),
      price_per_quintal: Math.round(primaryData.price_per_quintal * alternatives[1].priceMultiplier),
      estimated_revenue: Math.round(primaryData.estimated_revenue * alternatives[1].revenueMultiplier),
    }
  ]
}

  const handleWeatherFetch = (autoFilledFields?: string[]) => {
    // Add animation to all auto-filled inputs
    setTimeout(() => {
      // Animation handled by individual input components now
    }, 100)
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
          <CropForm onSubmit={handleSubmit} loading={loading} onWeatherFetch={handleWeatherFetch} />
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
