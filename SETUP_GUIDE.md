# 🌟 Indra Dhanu - Setup & Usage Guide

## ✅ What Has Been Upgraded

Your Indra Dhanu crop recommendation app has been completely upgraded with

### 🌐 **1. Industry-Standard i18next Translation System**
- ✅ Replaced broken LanguageContext with **react-i18next**
- ✅ Full multilingual support: **English, Hindi, Marathi**
- ✅ All text across the entire app is now translatable
- ✅ Language preference persists in localStorage

### ☁️ **2. Real Open-Meteo Weather API Integration**
- ✅ Replaced fake localhost API with **real Open-Meteo API**
- ✅ **NO API KEY REQUIRED** - Completely free!
- ✅ Fetches live weather data (temperature, humidity)
- ✅ Auto-fills form fields from weather data
- ✅ Weather data saved to localStorage

### 👤 **3. Fully Editable Profile Page**
- ✅ Edit name, email, role, and phone number
- ✅ Toggle between view and edit modes
- ✅ All changes saved to localStorage
- ✅ Profile data persists across sessions

### 🎯 **4. Smart Default City with Weather Auto-Fill**
- ✅ Set default city in profile
- ✅ Auto-fetches weather when saving city
- ✅ Weather data auto-loads in recommendation form
- ✅ One-click weather refresh button

---

## 📦 Installation Steps

### **Step 1: Install Dependencies**

The required packages have already been installed:
- ✅ i18next
- ✅ react-i18next
- ✅ i18next-http-backend
- ✅ axios

If you need to reinstall:
```bash
pnpm install
```

### **Step 2: Run the Development Server**

✨ **No API key needed!** The app uses Open-Meteo which is completely free and requires no registration.

```bash
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)
---

## 🎮 How to Use

### **1. Change Language**

1. Navigate to the **"Profile"** tab
2. In the **"Language Preference"** section, select:
   - **English**
   - **हिंदी (Hindi)**
   - **मराठी (Marathi)**
3. The entire app instantly translates! 🌍

### **2. Edit Your Profile**

1. Go to **"Profile"** tab
2. Click **"Edit Profile"** button
3. Modify your:
   - Name
   - Email
   - Role
   - Phone
4. Click **"Save Changes"**
5. Your data is saved to localStorage ✅

### **3. Set Default City & Fetch Weather**

1. In **"Profile"** → **"Weather Preference"** section
2. Enter your city (e.g., "Mumbai", "Pune", "Delhi")
3. Click **"Save"**
4. The app will:
   - ✅ Fetch real-time weather from OpenWeatherMap
   - ✅ Save weather data to localStorage
   - ✅ Display success message

### **4. Get Crop Recommendations**

1. Go to **"Get Recommendation"** tab
2. **Location field auto-fills** with your default city
3. **Weather data auto-loads**:
   - Temperature (°C)
   - Humidity (%)
4. Click **"Fetch Weather"** to refresh data
5. Fill in remaining fields:
   - Nitrogen (kg/ha)
   - Phosphorus (kg/ha)
   - Potassium (kg/ha)
   - pH Value
   - Rainfall (mm)
6. Click **"Get Recommendation"**
7. View your personalized crop recommendations! 🌾

---

## 📁 File Structure

### **NEW Files Created:**

```
├── lib/
│   └── i18n.ts                          # i18next configuration
├── services/
│   └── weather.ts                        # OpenWeatherMap API service
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json          # English translations
│       ├── hi/
│       │   └── translation.json          # Hindi translations
│       └── mr/
│           └── translation.json          # Marathi translations
└── env.example                           # API key template
```

### **MODIFIED Files:**

```
├── context/
│   └── PreferencesContext.tsx            # Now uses i18next + user profile management
├── components/
│   ├── language-selector.tsx             # Uses i18next instead of LanguageContext
│   ├── profile-page.tsx                  # Fully editable with weather integration
│   └── crop-form.tsx                     # Auto-loads weather + translation support
├── app/
│   ├── layout.tsx                        # Wrapped with PreferencesProvider
│   └── page.tsx                          # Translated tab labels
```

---

## 🔧 API Configuration

### **Open-Meteo Weather API**

**File**: `services/weather.ts`

**API Endpoints**:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Weather: `https://api.open-meteo.com/v1/forecast`

**Functions**:
- `getCityCoordinates(city: string)` - Converts city name to lat/long
- `getWeatherByCity(city: string)` - Fetches weather for a city
- `extractFarmDataFromWeather(weatherData)` - Extracts temperature & humidity

**Response Example**:
```json
{
  "name": "Mumbai",
  "latitude": 19.0761,
  "longitude": 72.8775,
  "country": "IN",
  "main": {
    "temp": 28.5,
    "humidity": 75
  }
}
```

**Features**:
- ✅ No API key required
- ✅ No registration needed
- ✅ No rate limits (reasonable use)
- ✅ Real-time weather data

**Error Handling**:
- ❌ City not found → User-friendly error message
- ❌ Network error → Retry prompt

---

## 🌍 Translation System

### **How it Works**

1. **i18next** loads translations from `/public/locales/{lang}/translation.json`
2. Components use `useTranslation()` hook:
   ```tsx
   const { t } = useTranslation()
   <h1>{t("welcome")}</h1>
   ```
3. Language changes are saved to localStorage
4. On app load, saved language is auto-restored

### **Adding New Translations**

Edit the JSON files in `/public/locales/`:

```json
// public/locales/en/translation.json
{
  "your_new_key": "Your English text",
  ...
}

// public/locales/hi/translation.json
{
  "your_new_key": "आपका हिंदी पाठ",
  ...
}
```

Then use it:
```tsx
{t("your_new_key")}
```

---

## 💾 LocalStorage Keys

The app uses these localStorage keys:

| Key | Purpose | Example Value |
|-----|---------|---------------|
| `indra-dhanu-language` | Current language | `"en"`, `"hi"`, `"mr"` |
| `indra-dhanu-default-city` | Default city name | `"Mumbai"` |
| `indra-dhanu-default-weather` | Cached weather data | `{...weatherObject}` |
| `indra-dhanu-user-profile` | User profile data | `{name, email, role, phone}` |

---

## 🐛 Troubleshooting

### **Problem: Weather API not working**

**Solution**:
1. Check your internet connection
2. Verify city name is spelled correctly
3. Open browser console (F12) to see detailed errors
4. Try a different city name (e.g., "Mumbai" instead of "Bombay")

### **Problem: Translations not loading**

**Solution**:
1. Clear browser cache
2. Check `/public/locales/` folder exists
3. Verify JSON files are valid
4. Restart dev server

### **Problem: Profile changes not saving**

**Solution**:
1. Check browser localStorage is enabled
2. Open DevTools → Application → Local Storage
3. Verify keys are being set

---

## 🚀 Production Deployment

Before deploying:

1. **Build the app**:
   ```bash
   pnpm build
   ```
2. **Test the build locally**:
   ```bash
   pnpm start
   ```
3. **Deploy** to your hosting platform (Vercel, Netlify, etc.)

✨ **No environment variables needed!** The app works out of the box.

---

## 📊 Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| 🌐 Multilingual (i18next) | ✅ Complete | EN, HI, MR with full app coverage |
| ☁️ Real Weather API | ✅ Complete | Open-Meteo integration (no API key!) |
| 👤 Editable Profile | ✅ Complete | Name, email, role, phone |
| 🎯 Smart Auto-Fill | ✅ Complete | Weather data → form fields |
| 💾 Persistent Storage | ✅ Complete | LocalStorage for all preferences |
| 🔄 Language Switching | ✅ Complete | Instant translation switching |
| 🌡️ Weather Fetch Button | ✅ Complete | Manual weather refresh |
| ⚙️ Profile Management | ✅ Complete | View/Edit modes |

---

## 🎯 Next Steps for You

1. **Run the app** → `pnpm dev` (no setup needed!)
2. **Test Language Switch** → Profile → Change to Hindi
3. **Edit Profile** → Click Edit → Modify → Save
4. **Set Default City** → Profile → Save "Pune" → Watch weather load
5. **Get Recommendations** → See auto-filled weather data! 🌾)

---

## 💡 Tips

- **Weather data expires**: Refresh it periodically in the Profile page
- **No API limits**: Open-Meteo is free with no rate limits for reasonable use
- **Multiple cities**: You can change default city anytime
- **Profile backup**: Export localStorage to save your data
- **Works offline**: Once weather data is fetched, it's cached in localStorage

---

## 📞 Support

If you encounter issues:

1. Check this guide's **Troubleshooting** section
2. Verify all dependencies are installed
3. Check browser console for errors
4. Verify your internet connection is active

---

**Happy Farming! 🌾🚜**

Built with ❤️ for Hackathon 2025
