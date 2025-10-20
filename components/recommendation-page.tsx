"use client"

import { useState } from "react"
import Header from "@/components/header"
import CropForm from "@/components/crop-form"
import ResultsDisplay from "@/components/results-display"
import Footer from "@/components/footer"

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
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setResults(null)
      setTopThree([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <CropForm onSubmit={handleSubmit} loading={loading} />
        {error && <div className="mt-8 p-4 bg-destructive/10 text-destructive rounded-lg max-w-2xl">{error}</div>}
        {results && <ResultsDisplay topCrop={results} topThree={topThree} />}
      </div>
      <Footer />
    </main>
  )
}
