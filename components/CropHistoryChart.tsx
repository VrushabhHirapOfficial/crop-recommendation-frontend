"use client"

import { motion } from "framer-motion"

interface CropHistoryChartProps {
  cropName: string
}

export default function CropHistoryChart({ cropName }: CropHistoryChartProps) {
  return (
    <motion.div
      className="glass card-glass dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 rounded-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center py-12">
        <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-4">
          Historical Data for {cropName}
        </h3>
        <p className="text-muted-foreground dark:text-gray-400">
          Chart component is loading...
        </p>
        <p className="text-sm text-muted-foreground dark:text-gray-500 mt-2">
          If you see this message, the component loaded successfully but needs data.
        </p>
      </div>
    </motion.div>
  )
}
