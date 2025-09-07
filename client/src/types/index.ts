export interface Property {
  id: string;
  mlsNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  status: PropertyStatus;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  dateListed: string;
  dateSold?: string;
  daysOnMarket: number;
  description: string;
  images: string[];
  features: string[];
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  brokerName: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export enum PropertyStatus {
  FOR_SALE = 'FOR_SALE',
  SOLD = 'SOLD',
  PENDING = 'PENDING',
  WITHDRAWN = 'WITHDRAWN',
  EXPIRED = 'EXPIRED'
}

export interface SearchFilters {
  query?: string;
  status?: PropertyStatus[];
  propertyType?: string[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  minYearBuilt?: number;
  maxYearBuilt?: number;
  dateListedFrom?: string;
  dateListedTo?: string;
  dateSoldFrom?: string;
  dateSoldTo?: string;
  city?: string[];
  state?: string[];
  zipCode?: string[];
  features?: string[];
  minDaysOnMarket?: number;
  maxDaysOnMarket?: number;
}

export interface SearchResponse {
  properties: Property[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
