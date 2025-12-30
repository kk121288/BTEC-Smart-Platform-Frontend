# Simulation API Integration Guide

## Base URL

```
Production: https://api.btec-platform.com
Development: http://localhost:8000
Staging: https://staging-api.btec-platform.com
```

## Authentication

All endpoints require JWT token in Authorization header:

```http
Authorization: Bearer <token>
```

### Token Acquisition

Tokens are obtained through the login endpoint and stored in the auth store. The frontend automatically includes the token in all API requests.

## Endpoints

### 1. Start Simulation

Initiates a new simulation session.

```http
POST /api/simulation/start
```

**Request Headers:**
```http
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```typescript
{
  studentName: string;
  decisions: {
    projectType: 'tech' | 'finance' | 'marketing';
    budget: 'low' | 'medium' | 'high';
    marketing: 'socialMedia' | 'traditional' | 'influencer';
    complexityLevel: 'Basic' | 'Intermediate' | 'Advanced';
    cybersecurity?: 'basic' | 'advanced' | 'enterprise';
    aiIntegration?: 'none' | 'basic' | 'advanced';
  };
}
```

**Example:**
```json
{
  "studentName": "John Doe",
  "decisions": {
    "projectType": "tech",
    "budget": "medium",
    "marketing": "socialMedia",
    "complexityLevel": "Advanced",
    "cybersecurity": "advanced",
    "aiIntegration": "basic"
  }
}
```

**Success Response (200 OK):**
```typescript
{
  simulationId: string;
  status: 'initiated' | 'running';
  createdAt: string; // ISO 8601
}
```

**Example:**
```json
{
  "simulationId": "sim-1234567890",
  "status": "initiated",
  "createdAt": "2025-12-30T13:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid decisions
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### 2. Save Simulation Results

Saves completed simulation to the database.

```http
POST /api/simulation/save
```

**Request Headers:**
```http
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```typescript
{
  simulationId: string;
  studentName: string;
  decisions: SimulationDecisions;
  performance: {
    tech: number;
    finance: number;
    market: number;
    overall: number;
  };
  result: {
    performance: SimulationPerformance;
    monthlyData: MonthlyData[];
    marketVolatility: number;
    riskFactors: string[];
    recommendations: string[];
    competitors: CompetitorData[];
  };
}
```

**Example:**
```json
{
  "simulationId": "sim-1234567890",
  "studentName": "John Doe",
  "decisions": { ... },
  "performance": {
    "tech": 85.5,
    "finance": 72.3,
    "market": 90.1,
    "overall": 82.6
  },
  "result": { ... }
}
```

**Success Response (201 Created):**
```typescript
{
  success: boolean;
  savedId: string;
  message: string;
}
```

**Example:**
```json
{
  "success": true,
  "savedId": "sim-1234567890",
  "message": "Simulation saved successfully"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Missing or invalid token
- `409 Conflict` - Simulation already exists
- `500 Internal Server Error` - Server error

---

### 3. Get Simulation History

Retrieves past simulations for a student.

```http
GET /api/simulation/history/:studentName
```

**Path Parameters:**
- `studentName` (string, required) - Name of the student

**Query Parameters:**
- `limit` (number, optional) - Number of results (default: 10, max: 50)
- `offset` (number, optional) - Pagination offset (default: 0)
- `sortBy` (string, optional) - Sort field: 'date' | 'performance' (default: 'date')
- `order` (string, optional) - Sort order: 'asc' | 'desc' (default: 'desc')

**Example:**
```http
GET /api/simulation/history/John%20Doe?limit=20&sortBy=performance&order=desc
```

**Success Response (200 OK):**
```typescript
{
  simulations: Simulation[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

**Example:**
```json
{
  "simulations": [
    {
      "id": "sim-1234567890",
      "studentName": "John Doe",
      "decisions": { ... },
      "performance": { ... },
      "result": { ... },
      "createdAt": "2025-12-30T13:00:00.000Z",
      "completedAt": "2025-12-30T13:05:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 20,
  "hasMore": true
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Student not found
- `500 Internal Server Error` - Server error

---

### 4. Get Single Simulation

Retrieves details of a specific simulation.

```http
GET /api/simulation/results/:id
```

**Path Parameters:**
- `id` (string, required) - Simulation ID

**Example:**
```http
GET /api/simulation/results/sim-1234567890
```

**Success Response (200 OK):**
```typescript
{
  simulation: Simulation;
}
```

**Example:**
```json
{
  "simulation": {
    "id": "sim-1234567890",
    "studentName": "John Doe",
    "decisions": {
      "projectType": "tech",
      "budget": "medium",
      "marketing": "socialMedia",
      "complexityLevel": "Advanced",
      "cybersecurity": "advanced",
      "aiIntegration": "basic"
    },
    "performance": {
      "tech": 85.5,
      "finance": 72.3,
      "market": 90.1,
      "overall": 82.6
    },
    "result": { ... },
    "createdAt": "2025-12-30T13:00:00.000Z",
    "completedAt": "2025-12-30T13:05:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Simulation not found
- `500 Internal Server Error` - Server error

---

### 5. Delete Simulation

Deletes a simulation from the database.

```http
DELETE /api/simulation/:id
```

**Path Parameters:**
- `id` (string, required) - Simulation ID

**Example:**
```http
DELETE /api/simulation/sim-1234567890
```

**Success Response (200 OK):**
```typescript
{
  success: boolean;
  message: string;
}
```

**Example:**
```json
{
  "success": true,
  "message": "Simulation deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Not authorized to delete this simulation
- `404 Not Found` - Simulation not found
- `500 Internal Server Error` - Server error

---

### 6. Get Leaderboard

Retrieves top-performing simulations.

```http
GET /api/simulation/leaderboard
```

**Query Parameters:**
- `metric` (string, optional) - Performance metric: 'tech' | 'finance' | 'market' | 'overall' (default: 'overall')
- `limit` (number, optional) - Number of results (default: 10, max: 100)
- `timeframe` (string, optional) - Time period: 'day' | 'week' | 'month' | 'all' (default: 'all')

**Example:**
```http
GET /api/simulation/leaderboard?metric=overall&limit=20&timeframe=week
```

**Success Response (200 OK):**
```typescript
{
  rankings: Array<{
    rank: number;
    studentName: string;
    score: number;
    simulationId: string;
    completedAt: string;
    decisions: {
      projectType: string;
      budget: string;
      marketing: string;
    };
  }>;
  metric: string;
  timeframe: string;
}
```

**Example:**
```json
{
  "rankings": [
    {
      "rank": 1,
      "studentName": "John Doe",
      "score": 92.5,
      "simulationId": "sim-1234567890",
      "completedAt": "2025-12-30T13:05:00.000Z",
      "decisions": {
        "projectType": "tech",
        "budget": "high",
        "marketing": "socialMedia"
      }
    }
  ],
  "metric": "overall",
  "timeframe": "week"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

## Error Handling

All errors follow this format:

```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  };
  statusCode: number;
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `AUTH_REQUIRED` | 401 | Authorization token missing or invalid |
| `FORBIDDEN` | 403 | User not authorized for this action |
| `SIMULATION_NOT_FOUND` | 404 | Simulation ID doesn't exist |
| `STUDENT_NOT_FOUND` | 404 | Student name not found |
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `DUPLICATE_SIMULATION` | 409 | Simulation already exists |
| `SERVER_ERROR` | 500 | Internal server error |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |

**Example Error:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid simulation decisions",
    "details": {
      "field": "budget",
      "issue": "Must be one of: low, medium, high"
    }
  },
  "statusCode": 400
}
```

## Rate Limiting

- **Default:** 100 requests per 15 minutes per user
- **Leaderboard:** 10 requests per minute
- **Save Simulation:** 10 requests per minute

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1735567200
```

## Mock Implementation

For development without backend:

### Environment Variable
```env
VITE_USE_MOCK_API=true
VITE_API_BASE_URL=http://localhost:8000
```

### Mock Service
```typescript
// src/services/simulation.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulationService = {
  async startSimulation(studentName: string, decisions: SimulationDecisions) {
    if (USE_MOCK) {
      await delay(1000);
      return {
        simulationId: `sim-${Date.now()}`,
        status: 'initiated' as const,
        createdAt: new Date().toISOString(),
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/simulation/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ studentName, decisions }),
    });
    
    if (!response.ok) throw new Error('Failed to start simulation');
    return response.json();
  },

  async saveSimulation(data: SaveSimulationRequest) {
    if (USE_MOCK) {
      await delay(500);
      return {
        success: true,
        savedId: data.simulationId,
        message: 'Simulation saved successfully (mock)',
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/simulation/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) throw new Error('Failed to save simulation');
    return response.json();
  },

  async getHistory(studentName: string, params?: HistoryParams) {
    if (USE_MOCK) {
      await delay(500);
      // Return mock data from localStorage
      const stored = localStorage.getItem('simulation-storage');
      const history = stored ? JSON.parse(stored).state.history : [];
      return {
        simulations: history.slice(0, params?.limit || 10),
        total: history.length,
        page: 1,
        limit: params?.limit || 10,
        hasMore: history.length > (params?.limit || 10),
      };
    }
    
    const queryString = new URLSearchParams(params as any).toString();
    const response = await fetch(
      `${API_BASE_URL}/api/simulation/history/${encodeURIComponent(studentName)}?${queryString}`,
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
  },

  async getSimulation(id: string) {
    if (USE_MOCK) {
      await delay(300);
      const stored = localStorage.getItem('simulation-storage');
      const history = stored ? JSON.parse(stored).state.history : [];
      const simulation = history.find((s: any) => s.id === id);
      if (!simulation) throw new Error('Simulation not found');
      return { simulation };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/simulation/results/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch simulation');
    return response.json();
  },

  async deleteSimulation(id: string) {
    if (USE_MOCK) {
      await delay(300);
      return {
        success: true,
        message: 'Simulation deleted successfully (mock)',
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/simulation/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to delete simulation');
    return response.json();
  },

  async getLeaderboard(params?: LeaderboardParams) {
    if (USE_MOCK) {
      await delay(500);
      // Generate mock leaderboard
      return {
        rankings: [],
        metric: params?.metric || 'overall',
        timeframe: params?.timeframe || 'all',
      };
    }
    
    const queryString = new URLSearchParams(params as any).toString();
    const response = await fetch(
      `${API_BASE_URL}/api/simulation/leaderboard?${queryString}`,
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return response.json();
  },
};

function getToken(): string {
  // Get token from auth store or localStorage
  return localStorage.getItem('auth-token') || '';
}
```

## Integration Examples

### Starting a Simulation
```typescript
import { simulationService } from '../services/simulation';

const handleStart = async (name: string, decisions: SimulationDecisions) => {
  try {
    const result = await simulationService.startSimulation(name, decisions);
    console.log('Simulation started:', result.simulationId);
    // Proceed with local calculation and 3D visualization
  } catch (error) {
    console.error('Failed to start simulation:', error);
    // Show error to user
  }
};
```

### Saving Results
```typescript
const handleComplete = async (simulation: Simulation) => {
  try {
    await simulationService.saveSimulation({
      simulationId: simulation.id,
      studentName: simulation.studentName,
      decisions: simulation.decisions,
      performance: simulation.performance,
      result: simulation.result,
    });
    console.log('Simulation saved to server');
  } catch (error) {
    console.error('Failed to save simulation:', error);
    // Still save locally via Zustand
  }
};
```

### Fetching History
```typescript
const loadHistory = async () => {
  try {
    const data = await simulationService.getHistory(userName, {
      limit: 20,
      sortBy: 'performance',
      order: 'desc',
    });
    setServerHistory(data.simulations);
  } catch (error) {
    console.error('Failed to fetch history:', error);
    // Fallback to local history
  }
};
```

## Best Practices

1. **Always handle errors gracefully** - Network requests can fail
2. **Show loading states** - API calls may take time
3. **Implement retry logic** - For transient failures
4. **Cache responses** - Reduce unnecessary API calls
5. **Sync local and server state** - Keep localStorage as fallback
6. **Validate data** - Before sending to API
7. **Use TypeScript** - For type-safe API calls
8. **Monitor rate limits** - Respect API quotas

## Testing

### Using Mock Mode
```bash
# In .env.local
VITE_USE_MOCK_API=true
```

### Using Real API
```bash
# In .env.local
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:8000
```

### Integration Tests
```typescript
describe('Simulation API', () => {
  it('should start a simulation', async () => {
    const result = await simulationService.startSimulation('Test User', mockDecisions);
    expect(result.simulationId).toBeDefined();
    expect(result.status).toBe('initiated');
  });
});
```
