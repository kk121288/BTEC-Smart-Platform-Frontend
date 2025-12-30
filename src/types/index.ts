// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Student types
export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  avatar?: string;
  grade?: string;
  course?: string;
  enrollmentDate: string;
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  maxGrade: number;
  submittedAt?: string;
}

// Result types
export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  assignmentTitle: string;
  grade: number;
  maxGrade: number;
  submittedAt: string;
  gradedAt?: string;
  feedback?: string;
}

// Upload types
export interface UploadProgress {
  filename: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export interface UploadHistory {
  id: string;
  filename: string;
  uploadedAt: string;
  size: number;
  status: 'processing' | 'completed' | 'failed';
}

// UI types
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';

// API types
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Filter types
export interface ResultFilters {
  search?: string;
  studentId?: string;
  assignmentId?: string;
  dateFrom?: string;
  dateTo?: string;
  minGrade?: number;
  maxGrade?: number;
}

export interface StudentFilters {
  search?: string;
  course?: string;
  grade?: string;
}

// Simulation types
export interface SimulationDecisions {
  projectType: 'tech' | 'finance' | 'marketing';
  budget: 'low' | 'medium' | 'high';
  marketing: 'socialMedia' | 'traditional' | 'influencer';
  complexityLevel: 'Basic' | 'Intermediate' | 'Advanced';
  cybersecurity?: 'basic' | 'advanced' | 'enterprise';
  aiIntegration?: 'none' | 'basic' | 'advanced';
}

export interface SimulationPerformance {
  tech: number;
  finance: number;
  market: number;
  overall: number;
}

export interface MonthlyData {
  month: number;
  revenue: number;
  costs: number;
  profit: number;
  marketShare: number;
  techScore: number;
  financeScore: number;
}

export interface CompetitorData {
  name: string;
  marketShare: number;
  strategy: string;
}

export interface EconomicEngineResult {
  performance: SimulationPerformance;
  monthlyData: MonthlyData[];
  marketVolatility: number;
  riskFactors: string[];
  recommendations: string[];
  competitors: CompetitorData[];
}

export interface Simulation {
  id: string;
  studentName: string;
  decisions: SimulationDecisions;
  performance: SimulationPerformance;
  result: EconomicEngineResult;
  createdAt: string;
  completedAt: string;
}

export interface LiveSimulationData {
  currentMonth: number;
  performance: SimulationPerformance;
  marketVolatility: number;
  competitorActivity: string[];
  elapsedTime: number;
}

export interface ComparisonInsight {
  metric: string;
  winner: string;
  difference: number;
  recommendation: string;
}

export interface ComparisonResult {
  simulations: Simulation[];
  insights: ComparisonInsight[];
}
