<div align="center">

# 🌾 Indra Dhanu - Smart Crop Recommendation System

### *Grow Smarter, Not Harder*

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, AI-powered web application that helps farmers make data-driven decisions for optimal crop selection.**

[🚀 Live Demo](https://your-vercel-url.vercel.app) • [📖 Documentation](SETUP_GUIDE.md) • [🐛 Report Bug](https://github.com/VrushabhHirapOfficial/crop-recommendation-frontend/issues) • [✨ Request Feature](https://github.com/VrushabhHirapOfficial/crop-recommendation-frontend/issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 About](#-about)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📱 Screenshots](#-screenshots)
- [🌐 Multi-Language Support](#-multi-language-support)
- [🤖 How It Works](#-how-it-works)
- [📊 API Integration](#-api-integration)
- [🎨 UI/UX Features](#-uiux-features)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## ✨ Features

### 🌟 Core Features

- **🤖 AI-Powered Recommendations** - Machine learning model analyzes soil and climate data
- **🌍 Real-Time Weather Integration** - Automatic weather fetching using Open-Meteo API
- **📊 Comprehensive Analysis** - Evaluates NPK levels, pH, temperature, humidity, and rainfall
- **📈 Yield Predictions** - Estimates potential crop yield in kg/hectare
- **💾 Profile Management** - Save and edit your farm details locally
- **🌐 Multi-Language Support** - Available in English, Hindi (हिंदी), and Marathi (मराठी)

### 🎨 Design Features

- **✨ Modern Glass-morphism UI** - Beautiful, contemporary design
- **📱 Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- **🎭 Smooth Animations** - Interactive elements with fluid transitions
- **🌈 Dynamic Backgrounds** - Animated gradient orbs that follow mouse movement
- **♿ Accessible** - Built with accessibility best practices

---

## 🎯 About

**Indra Dhanu** is a smart crop recommendation system designed to empower farmers with data-driven insights. By analyzing soil nutrients and local weather conditions, our AI model recommends the most suitable crops for maximum yield and profitability.

### 🎯 Problem It Solves

- ❌ Guesswork in crop selection
- ❌ Poor yield due to unsuitable crops
- ❌ Lack of data-driven farming decisions
- ❌ Language barriers in agricultural technology

### ✅ Our Solution

- ✅ Scientific crop recommendations
- ✅ Optimized yield predictions
- ✅ Easy-to-use interface
- ✅ Multi-language support for Indian farmers

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **TailwindCSS v4** | Modern utility-first styling |
| **shadcn/ui** | Beautiful, accessible components |
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |
| **i18next** | Internationalization |

### Backend & APIs

| Service | Purpose |
|---------|---------|
| **ML API** | Crop prediction model (Python/Flask) |
| **Open-Meteo** | Free weather data API |
| **LocalStorage** | Client-side data persistence |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VrushabhHirapOfficial/crop-recommendation-frontend.git
   cd crop-recommendation-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 📱 Screenshots

<div align="center">

### 🏠 Home Page
*Beautiful landing page with animated backgrounds*

### 📊 Get Recommendation
*Easy-to-use form with auto-weather fetching*

### 📈 Results Display
*Detailed crop recommendations with yield predictions*

### 👤 Profile Management
*Save and edit your farm details*

### 🌐 Multi-Language
*Seamless language switching*

</div>

---

## 🌐 Multi-Language Support

Indra Dhanu supports three languages:

| Language | Code | Status |
|----------|------|--------|
| 🇬🇧 English | `en` | ✅ Complete |
| 🇮🇳 हिंदी (Hindi) | `hi` | ✅ Complete |
| 🇮🇳 मराठी (Marathi) | `mr` | ✅ Complete |

**115+ translation keys** covering all UI elements, messages, and content.

---

## 🤖 How It Works

### 1️⃣ Input Farm Data
Users provide soil parameters:
- **Nitrogen (N)** - 0-140 kg/ha
- **Phosphorus (P)** - 5-145 kg/ha
- **Potassium (K)** - 5-205 kg/ha
- **pH Level** - 3.5-9.9
- **Location** - For weather data

### 2️⃣ Fetch Weather Data
System automatically retrieves:
- 🌡️ Temperature
- 💧 Humidity
- 🌧️ Rainfall

### 3️⃣ AI Analysis
Machine learning model processes:
- Soil nutrient levels
- Climate conditions
- Historical crop data

### 4️⃣ Get Recommendations
Receive:
- 🌾 Best crop suggestions
- 📊 Confidence scores
- 📈 Yield predictions
- 💰 Profitability insights

---

## 📊 API Integration

### Crop Prediction API

```typescript
POST https://crop-recommendation-api-vudg.onrender.com/predict

Request Body:
{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 20.87,
  "humidity": 82.00,
  "ph": 6.50,
  "rainfall": 202.93
}

Response:
{
  "crop": "rice",
  "confidence": 0.95,
  "yield_kg_per_hectare": 4500
}
```

### Weather API

```typescript
GET https://api.open-meteo.com/v1/forecast
  ?latitude={lat}
  &longitude={lon}
  &current=temperature_2m,relative_humidity_2m,precipitation
```

---

## 🎨 UI/UX Features

### 🎭 Animations
- Smooth page transitions
- Interactive button hover effects
- Animated gradient backgrounds
- Mouse-following orbs

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Touch-friendly controls

### ♿ Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast mode

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Vrushabh Hirap**

[![GitHub](https://img.shields.io/badge/GitHub-VrushabhHirapOfficial-181717?style=for-the-badge&logo=github)](https://github.com/VrushabhHirapOfficial)
[![Email](https://img.shields.io/badge/Email-vrushabhhirapdev@gmail.com-D14836?style=for-the-badge&logo=gmail)](mailto:vrushabhhirapdev@gmail.com)

</div>

---

## 🙏 Acknowledgments

- **Open-Meteo** - Free weather API
- **shadcn/ui** - Beautiful component library
- **Vercel** - Deployment platform
- **Next.js Team** - Amazing framework

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ for farmers everywhere**

</div>
