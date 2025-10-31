"use client"

import { motion } from "framer-motion"
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface CropHistoryChartProps {
  cropName: string
}

// Historical data patterns for different crops
const getHistoricalData = (cropName: string) => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
  
  // Yield in kg/ha and price in INR/100kg
  const cropData: Record<string, {yield: number[], price: number[]}> = {
    // Cereals
    rice: {
      yield: [3500, 3620, 3720, 3580, 3650],
      price: [1850, 1920, 2010, 2070, 2150]
    },
    wheat: {
      yield: [2800, 2900, 2950, 3020, 3100],
      price: [1975, 2010, 2080, 2120, 2180]
    },
    maize: {
      yield: [2600, 2700, 2650, 2800, 2750],
      price: [1850, 1760, 1820, 1890, 1950]
    },
    
    // Pulses
    chickpea: {
      yield: [1200, 1180, 1250, 1300, 1280],
      price: [4875, 4950, 5120, 5250, 5180]
    },
    pigeonpeas: {
      yield: [850, 880, 900, 870, 920],
      price: [6250, 6380, 6520, 6650, 6580]
    },
    
    // Commercial crops
    coffee: {
      yield: [800, 820, 850, 830, 840],
      price: [4125, 4250, 4320, 4450, 4580]
    },
    cotton: {
      yield: [450, 470, 460, 480, 490],
      price: [5820, 5960, 6050, 6120, 6250]
    },
    
    // Default pattern for unknown crops
    default: {
      yield: [2000, 2100, 2050, 2150, 2200],
      price: [2500, 2550, 2600, 2650, 2700]
    }
  };

  const cropKey = cropName.toLowerCase().replace(/\s+/g, '');
  const selectedCrop = cropData[cropKey] || cropData.default;
  
  return years.map((year, index) => ({
    year,
    yield: selectedCrop.yield[index % selectedCrop.yield.length],
    price: selectedCrop.price[index % selectedCrop.price.length]
  }));
}

export default function CropHistoryChart({ cropName }: CropHistoryChartProps) {
  const historicalData = getHistoricalData(cropName);

  const data = {
    labels: historicalData.map(item => item.year),
    datasets: [
      {
        label: 'Yield (kg/ha)',
        data: historicalData.map(item => item.yield),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
        tension: 0.3,
      },
      {
        label: 'Price (per kg)',
        data: historicalData.map(item => item.price),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y1',
        tension: 0.3,
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Yield (kg/ha)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Price (₹/kg)',
        },
      },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        className="glass card-glass dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-6 rounded-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-foreground dark:text-gray-200 mb-6 text-center">
          Historical Data for {cropName}
        </h3>
        <div className="h-80 w-full flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground dark:text-gray-400 text-center">
          Historical yield and price trends for {cropName} over the past 5 years
        </div>
      </motion.div>
    </div>
  )
}
