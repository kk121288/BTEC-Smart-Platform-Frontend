# BTEC Smart Platform - Simulation Architecture

## Overview
Technical documentation for the 3D business simulation system built for the BTEC Smart Platform. This system provides students with an immersive learning experience where they can make business decisions and see real-time results in a 3D virtual environment.

## Technology Stack

### Core Technologies
- **3D Engine:** Three.js (v0.160+) via @react-three/fiber
- **3D Helpers:** @react-three/drei (OrbitControls, Environment, Sky, Grid)
- **React:** React 19 with Suspense for lazy loading
- **State Management:** Zustand with persistence middleware
- **TypeScript:** Full type safety across the application
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Routing:** React Router DOM v7
- **Animation:** Framer Motion for UI transitions

### Package Dependencies
```json
{
  "three": "latest",
  "@react-three/fiber": "latest",
  "@react-three/drei": "latest",
  "@types/three": "latest",
  "zustand": "^5.0.9",
  "react": "^19.2.0",
  "lucide-react": "^0.562.0",
  "framer-motion": "^12.23.26"
}
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Simulation Page (Main)                   │
│  ┌──────────────┬──────────────────┬─────────────────────┐  │
│  │ Setup Tab    │ History Tab      │ Compare Tab         │  │
│  └──────────────┴──────────────────┴─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
           │                │                    │
           ▼                ▼                    ▼
    ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐
    │ Setup Form  │  │   History    │  │   Comparison    │
    └─────────────┘  │   Viewer     │  │     Tool        │
           │         └──────────────┘  └─────────────────┘
           ▼
    ┌─────────────┐
    │  Economic   │
    │   Engine    │◄──── Decisions Input
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │  3D Scene   │
    │(VirtualEnv) │
    ├─────────────┤
    │ • Building  │
    │ • Lighting  │
    │ • Grid      │
    │ • Controls  │
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │   Results   │
    │   Report    │
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │  Simulation │
    │   Storage   │
    │  (Zustand)  │
    └─────────────┘
```

## Data Flow

### 1. User Input Phase (SimulationSetup)
```typescript
User fills form → SimulationDecisions {
  projectType: 'tech' | 'finance' | 'marketing',
  budget: 'low' | 'medium' | 'high',
  marketing: 'socialMedia' | 'traditional' | 'influencer',
  complexityLevel: 'Basic' | 'Intermediate' | 'Advanced',
  cybersecurity?: 'basic' | 'advanced' | 'enterprise',
  aiIntegration?: 'none' | 'basic' | 'advanced'
}
```

### 2. Economic Engine Calculation
```typescript
EconomicEngine.calculate() → {
  performance: {
    tech: number,      // 0-100
    finance: number,   // 0-100
    market: number,    // 0-100
    overall: number    // average
  },
  monthlyData: Array<{
    month: number,
    revenue: number,
    costs: number,
    profit: number,
    marketShare: number,
    techScore: number,
    financeScore: number
  }>,
  marketVolatility: number,  // 0-50%
  riskFactors: string[],
  recommendations: string[],
  competitors: CompetitorData[]
}
```

### 3. 3D Visualization (VirtualEnvironment)
- Renders appropriate building based on budget
- Displays real-time data overlay
- Provides camera controls
- Animates progression through 12 months

### 4. Results Display (SimulationReport)
- Performance metrics cards
- Risk factors list
- Recommendations
- Competitor analysis
- Monthly performance chart
- Market volatility indicator

### 5. History Storage (Zustand + localStorage)
```typescript
saveSimulation() → localStorage['simulation-storage']
  ├── history: Simulation[]  (last 50)
  └── currentSimulation: Simulation | null
```

## 3D Models & Components

### Building Models

#### 1. Skyscraper (High Budget)
```typescript
Geometry: BoxGeometry(2, 5, 2)
Material: MeshStandardMaterial {
  color: '#00ffcc',
  metalness: 0.8,
  roughness: 0.2,
  emissive: '#00ffcc',
  emissiveIntensity: 0.2
}
Position: [0, 2.5, 0]
Features: 10 illuminated windows
```

#### 2. Modern Building (Medium Budget)
```typescript
Geometry: BoxGeometry(2, 3, 2)
Material: MeshStandardMaterial {
  color: '#0099ff',
  metalness: 0.5,
  roughness: 0.4,
  emissive: '#0099ff',
  emissiveIntensity: 0.1
}
Position: [0, 1.5, 0]
Features: 6 illuminated windows
```

#### 3. Garage (Low Budget)
```typescript
Main: BoxGeometry(1.5, 1.5, 1.5)
Roof: ConeGeometry(1.2, 0.8, 4)
Material: MeshStandardMaterial {
  color: '#666666',
  roughness: 0.8,
  metalness: 0.1
}
Position: [0, 0.75, 0]
Features: Door, pyramid roof
```

### Scene Components

#### Lighting
- **Ambient Light:** intensity 0.3 (base illumination)
- **Directional Light:** position [10, 10, 5], intensity 1, with shadows
- **Point Light:** position [-10, 10, -10], cyan tint, intensity 0.5

#### Environment
- **Sky:** Distance 450000, dynamic sun position
- **Grid:** 20x20 cells, cyan color (#00ffcc), section markers every 5 units
- **Ground:** 20x20 plane, dark material, receives shadows

#### Camera
- **Default Position:** [8, 6, 8]
- **FOV:** 50 degrees
- **Controls:** OrbitControls with damping
- **Min/Max Distance:** 5-20 units

## Economic Engine

### Performance Calculation Algorithm

#### Tech Score (0-100)
```
Base: 50
+ Project Type: tech(+20), finance(+10), marketing(+5)
+ AI Integration: advanced(+15), basic(+8), none(0)
+ Complexity: Advanced(+10), Intermediate(+5), Basic(0)
+ Random variance: ±5
= Min(100, total)
```

#### Finance Score (0-100)
```
Base: 50
+ Budget: high(+25), medium(+15), low(+5)
+ Cybersecurity: enterprise(+15), advanced(+10), basic(+3)
× (1 - marketVolatility)  // volatility penalty
+ Random variance: ±5
= Min(100, total)
```

#### Market Score (0-100)
```
Base: 50
+ Marketing: socialMedia(+30), influencer(+25), traditional(+10)
+ Project fit: marketing(+15), finance(+8), tech(0)
+ Budget boost: high(+10), medium(+5), low(0)
+ Random variance: ±5
= Min(100, total)
```

### Monthly Data Generation
For each month (1-12):
```typescript
growthRate = performance.overall / 100
monthlyGrowth = 1 + (growthRate × 0.1 × month) + random(-0.05, 0.05)

revenue = baseRevenue × monthlyGrowth
costs = revenue × (0.7 - performance.finance / 200)
profit = revenue - costs
marketShare = (performance.market / 100) × (10 + month × 0.5)
```

### Risk Identification Rules
- Low budget → "Limited budget may restrict growth opportunities"
- Basic/no cybersecurity → "Basic cybersecurity poses significant data breach risks"
- Traditional marketing → "May not reach digital-native customers"
- No/basic AI → "Lack of AI integration may reduce competitive advantage"
- High volatility (>30%) → "High market volatility - financial stability at risk"
- Basic complexity + tech project → "May not meet tech project requirements"

## State Management (Zustand)

### Store Structure
```typescript
interface SimulationStore {
  currentSimulation: Simulation | null;
  history: Simulation[];  // max 50, newest first
  isRunning: boolean;
  currentMonth: number;
  
  // Actions
  setCurrentSimulation: (sim: Simulation | null) => void;
  saveSimulation: (sim: Simulation) => void;
  deleteSimulation: (id: string) => void;
  searchHistory: (query: string) => Simulation[];
  compareSimulations: (ids: string[]) => ComparisonResult;
  loadHistory: () => void;
  clearHistory: () => void;
}
```

### Persistence
```typescript
persist(store, {
  name: 'simulation-storage',
  partialize: (state) => ({ history: state.history })
})
```
- Stores in localStorage
- Only persists history array
- Automatic rehydration on app load
- 50 simulation limit (oldest removed first)

## Performance Optimization

### 1. Lazy Loading
```typescript
<Suspense fallback={<LoadingSpinner />}>
  <VirtualEnvironment decisions={decisions} />
</Suspense>
```

### 2. Memoization
- `useMemo` for filtered/sorted history
- `useMemo` for comparison results
- React.memo for expensive child components

### 3. Efficient Re-rendering
```typescript
// Zustand selectors prevent unnecessary renders
const history = useSimulationStore(state => state.history);
const saveSimulation = useSimulationStore(state => state.saveSimulation);
```

### 4. Canvas Optimization
```typescript
<Canvas gl={{ preserveDrawingBuffer: true }}>
  {/* Enables screenshot capability */}
</Canvas>
```

### 5. Cleanup
```typescript
useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval);  // Cleanup
}, [dependencies]);
```

## Component Hierarchy

```
Simulation (Page)
├── SimulationSetup
│   └── Form with decision inputs
├── VirtualEnvironment
│   ├── Canvas (React Three Fiber)
│   │   ├── Scene
│   │   │   ├── Building (Skyscraper | ModernBuilding | Garage)
│   │   │   ├── Lighting (Ambient, Directional, Point)
│   │   │   ├── Ground
│   │   │   ├── Grid
│   │   │   └── Environment (Sky)
│   │   └── OrbitControls
│   └── SimulationControls
│       └── Camera view buttons
├── SimulationDataViewer
│   ├── Current month display
│   ├── Performance metrics
│   ├── Market volatility
│   └── Competitor activity
├── SimulationReport
│   ├── Performance scores
│   ├── Risk factors
│   ├── Recommendations
│   ├── Competitor analysis
│   └── Monthly chart
├── SimulationTimeline
│   ├── Revenue line chart
│   ├── Market share bars
│   └── Monthly details
├── SimulationHistory
│   ├── Search & filter
│   ├── Simulation list
│   └── Details modal
└── SimulationComparison
    ├── Selection panel
    ├── Performance table
    ├── Decision table
    └── Insights
```

## Future Enhancements

### Short Term
- [ ] Custom GLTF model support
- [ ] Advanced camera animations
- [ ] Sound effects for milestones
- [ ] PDF export functionality
- [ ] Excel export for data

### Medium Term
- [ ] Physics simulation (buildings respond to performance)
- [ ] Particle effects (growth indicators)
- [ ] Multiple building types per simulation
- [ ] Advanced competitor AI

### Long Term
- [ ] Multiplayer comparison mode (real-time)
- [ ] VR support for immersive experience
- [ ] Custom scenario builder
- [ ] Machine learning for decision suggestions
- [ ] Real-time collaboration features

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Prefer functional components
- Use custom hooks for reusable logic
- Follow React best practices
- Document complex algorithms

### Testing Considerations
- Unit test Economic Engine calculations
- Integration test simulation flow
- Visual regression test 3D scenes
- Performance test with 50+ simulations in history

### Deployment
- Ensure Three.js assets are properly bundled
- Optimize 3D models for web delivery
- Configure CDN for faster asset loading
- Enable gzip compression
- Set appropriate cache headers

## Troubleshooting

### Common Issues

**3D Scene Not Rendering**
- Check WebGL support in browser
- Verify Three.js version compatibility
- Check console for shader errors

**Performance Issues**
- Reduce shadow quality
- Limit number of light sources
- Optimize building geometry
- Clear old simulations from history

**State Not Persisting**
- Check localStorage quota
- Verify persist middleware configuration
- Test in incognito mode (localStorage available?)

## Support & Resources

- **Three.js Docs:** https://threejs.org/docs/
- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber
- **Zustand Docs:** https://docs.pmnd.rs/zustand
- **Tailwind CSS:** https://tailwindcss.com/docs
