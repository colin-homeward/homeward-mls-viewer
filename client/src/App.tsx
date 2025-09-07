import React, { useState } from 'react';
import { Box, Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { SearchFilters, Property } from './types';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetail from './components/PropertyDetail';
import { usePropertySearch } from './hooks/usePropertySearch';

const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const {
    properties,
    totalCount,
    isLoading,
    error,
    searchProperties,
    page,
    setPage,
    pageSize,
    setPageSize
  } = usePropertySearch();

  const handleSearch = (searchFilters: SearchFilters) => {
    setFilters(searchFilters);
    searchProperties(searchFilters);
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: 2, 
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                H
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ 
                color: 'white', 
                fontWeight: 700,
                lineHeight: 1.2
              }}>
                Homebase MLS
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.75rem'
              }}>
                Property Data Viewer
              </Typography>
            </Box>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            background: 'rgba(255, 255, 255, 0.1)',
            px: 2,
            py: 1,
            borderRadius: 2
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {totalCount > 0 ? `${totalCount.toLocaleString()} properties` : 'Search properties'}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <SearchBar
          onSearch={handleSearch}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
          isLoading={isLoading}
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Panel - Filters and Results */}
        <Box sx={{ 
          width: showFilters ? '400px' : '0px', 
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          borderRight: 1,
          borderColor: 'divider',
          flexShrink: 0
        }}>
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={handleSearch}
            />
          )}
        </Box>

        {/* Center Panel - Property Grid */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          minWidth: 0
        }}>
          <PropertyGrid
            properties={properties}
            totalCount={totalCount}
            isLoading={isLoading}
            error={error}
            onPropertySelect={handlePropertySelect}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </Box>

        {/* Right Panel - Property Details */}
        <Box sx={{ 
          width: selectedProperty ? '400px' : '0px',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          borderLeft: 1,
          borderColor: 'divider',
          flexShrink: 0
        }}>
          {selectedProperty && (
            <PropertyDetail
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
