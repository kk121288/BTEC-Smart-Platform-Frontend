# 🎓 BTEC Smart Platform - Frontend

> Advanced educational platform with 3D simulation, data visualization, and multi-language support

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/kk121288/BTEC-Smart-Platform-Frontend)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-11%2F11%20passing-success)](https://vitest.dev/)
[![PWA](https://img.shields.io/badge/PWA-enabled-orange)](https://web.dev/progressive-web-apps/)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20AR-informational)](https://react.i18next.com/)

## ✨ Features

### 🎮 3D Simulation System
- **Interactive 3D Environment**: Powered by React Three Fiber
- **Economic Engine**: Complex business logic simulation
- **Multiple Scenarios**: Budget-based environments (Skyscraper, Modern Building, Garage)
- **Real-time Analytics**: 12-month performance projections
- **Competitor AI**: Simulated market competition

### 📊 Data Visualization
- **Chart Library**: Line, Bar, Pie, and Area charts
- **Dashboard**: Real-time statistics and KPIs
- **Performance Tracking**: Visual progress indicators
- **Export**: Charts as images, data as Excel/PDF/CSV

### 🌐 Multi-language Support
- **Languages**: English & Arabic
- **RTL Support**: Automatic right-to-left layout
- **Translation Coverage**: Complete UI translations
- **Language Switcher**: Easy toggle between languages

### 📱 Progressive Web App
- **Offline Support**: Service worker caching
- **Installable**: Add to home screen
- **Fast Loading**: Optimized assets
- **Responsive**: Mobile, tablet, desktop

### 🎨 Modern UI
- **Dark Theme**: Neon cyan accents (#00ffcc)
- **Glass Morphism**: Modern design effects
- **Animations**: Smooth transitions
- **Components**: Badge, Progress, Tabs, and more

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kk121288/BTEC-Smart-Platform-Frontend.git

# Navigate to project
cd BTEC-Smart-Platform-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage |

## 🏗️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS v4** - Styling

### 3D & Visualization
- **React Three Fiber** - 3D rendering
- **@react-three/drei** - 3D helpers
- **Chart.js** - Charts
- **Recharts** - Advanced charts

### State & Routing
- **Zustand** - State management
- **React Router** - Navigation
- **Axios** - HTTP client

### Features
- **react-i18next** - Internationalization
- **Vitest** - Testing
- **vite-plugin-pwa** - PWA support
- **jspdf** - PDF export
- **xlsx** - Excel export

## 📁 Project Structure

```
src/
├── components/
│   ├── simulation/      # 3D simulation components
│   │   ├── 3DModels/   # Skyscraper, ModernBuilding, Garage
│   │   ├── EconomicEngine.ts
│   │   ├── VirtualEnvironment.tsx
│   │   ├── SimulationSetup.tsx
│   │   ├── SimulationLoading.tsx
│   │   └── SimulationReport.tsx
│   ├── charts/         # Chart components
│   ├── ui/             # UI components
│   └── Layout.tsx      # Main layout
├── pages/              # Route pages
│   ├── Dashboard.tsx
│   ├── Simulation.tsx
│   ├── Profile.tsx
│   └── Settings.tsx
├── services/           # API services
├── store/              # Zustand stores
├── types/              # TypeScript types
├── i18n/               # Translations
├── lib/                # Utilities
└── __tests__/         # Test files
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

Current test coverage: **11/11 tests passing**

## 🌍 Internationalization

The app supports English and Arabic with automatic RTL layout:

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Use translations
<h1>{t('dashboard.title')}</h1>

// Change language
i18n.changeLanguage('ar');
```

## 📱 PWA Configuration

The app is configured as a Progressive Web App with:
- Service worker for offline support
- Web app manifest
- Optimized caching strategies
- Fast loading on all networks

## 🎨 Design System

### Colors
- **Primary**: `#00ffcc` (Neon Cyan)
- **Background**: `#0a0a0a`, `#050505`
- **Borders**: Cyan with opacity

### Typography
- **Headings**: Orbitron
- **Body**: Inter

### Effects
- Glass morphism
- Neon glow
- Smooth animations

## 🔌 API Integration

Configure API endpoint in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

API services available:
- Simulation API
- Notifications API
- Export API

## 🛠️ Development

### TypeScript Path Aliases

```typescript
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/store/authStore';
```

### Adding New Components

1. Create component in `src/components/`
2. Export from component file
3. Import where needed

### Adding New Pages

1. Create page in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Layout.tsx`

## 📊 Performance

- **Build Size**: 1.48 MB (434 KB gzipped)
- **Lighthouse Score**: Optimized for performance
- **Code Splitting**: Dynamic imports for large modules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **BTEC Smart Platform Team**

## 🙏 Acknowledgments

- React Three Fiber team
- Chart.js community
- Tailwind CSS team
- All open-source contributors

---

**Built with ❤️ for BTEC students**
