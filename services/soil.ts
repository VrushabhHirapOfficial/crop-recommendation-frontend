import axios from "axios"

interface SoilData {
  nitrogen: number    // N in kg/ha
  phosphorus: number  // P in kg/ha
  potassium: number   // K in kg/ha
  ph_value: number    // pH level
  region: string
  description: string
}

interface SoilDataEntry {
  nitrogen: number
  phosphorus: number
  potassium: number
  ph_value: number
}

interface SoilDataJSON {
  [key: string]: SoilDataEntry
}

/**
 * Get soil data for a specific region/city from the local JSON file
 * @param region - Region or city name (case-insensitive)
 * @returns Promise with soil data for the region or null if not found
 */
export async function getSoilDefaults(region: string): Promise<SoilData | null> {
  try {
    // Fetch soil data from local JSON file
    const response = await axios.get<SoilDataJSON>('/soil_data.json')
    const soilData = response.data

    if (!region || region.trim() === "") {
      return getDefaultSoilData()
    }

    // Normalize the region name (lowercase, trim spaces)
    const normalizedRegion = region.toLowerCase().trim()

    // Try exact match first
    if (soilData[normalizedRegion]) {
      return {
        nitrogen: soilData[normalizedRegion].nitrogen,
        phosphorus: soilData[normalizedRegion].phosphorus,
        potassium: soilData[normalizedRegion].potassium,
        ph_value: soilData[normalizedRegion].ph_value,
        region: normalizedRegion,
        description: `Average soil conditions for ${normalizedRegion}`
      }
    }

    // Try partial matches for common variations
    for (const [key, data] of Object.entries(soilData)) {
      if (key.includes(normalizedRegion) || normalizedRegion.includes(key)) {
        return {
          nitrogen: data.nitrogen,
          phosphorus: data.phosphorus,
          potassium: data.potassium,
          ph_value: data.ph_value,
          region: key,
          description: `Average soil conditions for ${key}`
        }
      }
    }

    // Return null if region not found (for error handling)
    return null

  } catch (error) {
    console.error("Failed to fetch soil data:", error)
    // Return null on error (for error handling)
    return null
  }
}

/**
 * Get default soil values (Pune district data) - fallback function
 * @returns Default soil data for unknown regions
 */
function getDefaultSoilData(): SoilData {
  return {
    nitrogen: 260,
    phosphorus: 20,
    potassium: 290,
    ph_value: 7.9,
    region: "Default Region (Pune District)",
    description: "Average soil conditions suitable for most crops"
  }
}
