"use client"

import { useEffect, useState } from "react"
import { TrendingUp, DollarSign, Target, Award } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

interface CropResult {
  crop: string
  confidence: number
  yield_kg_per_hectare: number
  price_per_quintal: number
  estimated_revenue: number
}

interface ResultsDisplayProps {
  topCrop: CropResult
  topThree: CropResult[]
}

export default function ResultsDisplay({ topCrop, topThree }: ResultsDisplayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const chartData = topThree.map((crop, idx) => ({
    name: `Option ${idx + 1}`,
    revenue: Math.round(crop.estimated_revenue),
    yield: Math.round(crop.yield_kg_per_hectare),
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className="w-full max-w-4xl mt-12 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.div className="relative" variants={itemVariants}>
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-orange-400 rounded-3xl blur-2xl opacity-40"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
          }}
        ></motion.div>
        <div className="glass card-glass relative bg-gradient-to-br from-white/20 to-white/5 p-8 md:p-12 rounded-3xl border-2 border-accent/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 mb-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                  <Award className="w-6 h-6 text-accent" />
                </motion.div>
                <span className="text-sm font-bold text-accent uppercase tracking-widest">Top Recommendation</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground capitalize">{topCrop.crop}</h2>
            </motion.div>
            <motion.div
              className="text-right"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
                {topCrop.confidence.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground font-semibold">Confidence</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                label: "Expected Yield",
                value: `${topCrop.yield_kg_per_hectare.toLocaleString()} kg/ha`,
              },
              {
                icon: DollarSign,
                label: "Market Price",
                value: `₹${topCrop.price_per_quintal.toLocaleString(undefined, { maximumFractionDigits: 0 })}/quintal`,
              },
              {
                icon: Target,
                label: "Estimated Revenue",
                value: `₹${topCrop.estimated_revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                highlight: true,
              },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={idx}
                  className={`glass rounded-2xl p-6 ${stat.highlight ? "bg-accent/10 border-accent/30" : "bg-white/5 border-white/10"}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-5 h-5 ${stat.highlight ? "text-accent" : "text-primary"}`} />
                    <span className="text-sm font-semibold text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className={`text-2xl font-bold ${stat.highlight ? "text-accent" : "text-foreground"}`}>
                    {stat.value}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Top 3 Suitable Crops</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThree.map((crop, idx) => (
            <motion.div
              key={idx}
              className="glass card-glass p-6 rounded-2xl cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-4">
                <motion.p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">
                  Option {idx + 1}
                </motion.p>
                <h4 className="text-2xl font-bold text-foreground capitalize">{crop.crop}</h4>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Confidence</span>
                  <span className="font-bold text-foreground text-lg">{crop.confidence.toFixed(1)}%</span>
                </div>
                <motion.div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${crop.confidence}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                </motion.div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  {[
                    { label: "Yield", value: `${crop.yield_kg_per_hectare.toLocaleString()} kg/ha` },
                    {
                      label: "Price",
                      value: `₹${crop.price_per_quintal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                    },
                    {
                      label: "Revenue",
                      value: `₹${crop.estimated_revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                      highlight: true,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={`font-semibold ${item.highlight ? "text-accent" : "text-foreground"}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="glass card-glass p-8 rounded-3xl" variants={itemVariants}>
        <h3 className="text-2xl font-bold text-foreground mb-8">Revenue Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <YAxis stroke="rgba(255,255,255,0.7)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20, 20, 30, 0.95)",
                border: "2px solid rgba(255, 165, 0, 0.5)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                color: "rgba(255,255,255,0.9)",
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
              labelStyle={{ color: "rgba(255,255,255,0.9)" }}
            />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.8)" }} />
            <Bar dataKey="revenue" fill="#FFA500" name="Revenue (₹)" radius={[12, 12, 0, 0]} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}
