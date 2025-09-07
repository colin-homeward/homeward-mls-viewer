import { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { SearchFilters, Property, SearchResponse } from '../types';
import { propertyApi } from '../services/api';

export const usePropertySearch = () => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const {
    data: searchData,
    isLoading,
    error,
    refetch
  } = useQuery<SearchResponse>(
    ['properties', filters, page, pageSize],
    () => propertyApi.searchProperties(filters, page, pageSize),
    {
      enabled: Object.keys(filters).length > 0,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const searchProperties = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when searching
  }, []);

  return {
    properties: searchData?.properties || [],
    totalCount: searchData?.totalCount || 0,
    totalPages: searchData?.totalPages || 0,
    page,
    pageSize,
    isLoading,
    error,
    searchProperties,
    setPage,
    setPageSize,
    refetch
  };
};
