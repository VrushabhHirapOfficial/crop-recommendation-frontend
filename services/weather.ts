import axios from "axios"

/**
 * Open-Meteo Weather API Integration
 * 
 * This is a FREE weather API that requires NO API KEY!
 * - API: https://open-meteo.com/
 * - Geocoding: https://geocoding-api.open-meteo.com/
 * - Weather: https://api.open-meteo.com/v1/forecast
 * 
 * Features:
 * - No registration required
 * - No rate limits for reasonable use
 * - Real-time weather data
 * - Temperature and humidity
 */

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast"

interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

interface GeocodingResponse {
  results?: GeocodingResult[]
}

interface WeatherResponse {
  latitude: number
  longitude: number
  hourly: {
    temperature_2m: number[]
    relative_humidity_2m: number[]
    precipitation: number[]
  }
  hourly_units: {
    temperature_2m: string
    relative_humidity_2m: string
    precipitation: string
  }
}

export interface WeatherData {
  name: string
  latitude: number
  longitude: number
  country: string
  main: {
    temp: number
    humidity: number
    rainfall: number
  }
}

export interface WeatherError {
  message: string
  cod?: string | number
}

/**
 * Get coordinates for a city name using geocoding
 * @param city - City name (e.g., "Mumbai", "Pune", "Delhi")
 * @returns Coordinates and city information
 */
async function getCityCoordinates(city: string): Promise<GeocodingResult> {
  try {
    const response = await axios.get<GeocodingResponse>(GEOCODING_URL, {
      params: {
        name: city,
        count: 1,
        language: "en",
        format: "json",
      },
    })

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error("City not found. Please check the spelling and try again.")
    }

    return response.data.results[0]
  } catch (error: any) {
    if (error.message.includes("City not found")) {
      throw error
    }
    throw new Error("Failed to find city. Please check your internet connection.")
  }
}

/**
 * Fetch current weather data for a city
 * @param city - City name (e.g., "Mumbai", "Pune", "Delhi")
 * @returns Weather data including temperature, humidity, etc.
 */
export async function getWeatherByCity(city: string): Promise<WeatherData> {
  if (!city || city.trim() === "") {
    throw new Error("City name is required")
  }

  try {
    // Step 1: Get coordinates for the city
    const location = await getCityCoordinates(city)

    // Step 2: Fetch weather data using coordinates
    const response = await axios.get<WeatherResponse>(WEATHER_URL, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        hourly: "temperature_2m,relative_humidity_2m,precipitation",
        current_weather: true,
      },
    })

    // Get current hour's data (first element in hourly arrays)
    const currentTemp = response.data.hourly.temperature_2m[0]
    const currentHumidity = response.data.hourly.relative_humidity_2m[0]
    const currentRainfall = response.data.hourly.precipitation[0]

    // Format data to match our interface
    return {
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
      main: {
        temp: currentTemp,
        humidity: currentHumidity,
        rainfall: currentRainfall,
      },
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.message.includes("City not found")) {
        throw error
      }
      throw new Error("Failed to fetch weather data. Please try again.")
    }
    throw error
  }
}

/**
 * Extract relevant farm data from weather API response
 * @param weatherData - Raw weather data from Open-Meteo
 * @returns Formatted data for crop recommendation
 */
export function extractFarmDataFromWeather(weatherData: WeatherData) {
  return {
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    rainfall: weatherData.main.rainfall,
    // Note: Open-Meteo doesn't provide N, P, K, or pH data
    // These would need to be entered manually or from a soil testing service
  }
}
