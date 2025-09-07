import axios from 'axios';
import { SearchFilters, SearchResponse, Property, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://homeward-mls-api.vercel.app/api' 
    : 'http://localhost:3001/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const propertyApi = {
  // Search properties with filters
  searchProperties: async (filters: SearchFilters, page: number = 1, pageSize: number = 20): Promise<SearchResponse> => {
    const response = await api.post<ApiResponse<SearchResponse>>('/search/properties', {
      ...filters,
      page,
      pageSize,
    });
    return response.data.data;
  },

  // Get property by ID
  getProperty: async (id: string): Promise<Property> => {
    const response = await api.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data.data;
  },

  // Get property statistics
  getPropertyStats: async (filters?: SearchFilters) => {
    const response = await api.post<ApiResponse<any>>('/search/stats', filters || {});
    return response.data.data;
  },

  // Get available filter options
  getFilterOptions: async () => {
    const response = await api.get<ApiResponse<any>>('/search/filter-options');
    return response.data.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
