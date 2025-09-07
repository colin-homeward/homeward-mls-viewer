import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  FormControlLabel,
  Checkbox,
  Autocomplete
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { SearchFilters, PropertyStatus } from '../types';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onApplyFilters: (filters: SearchFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onApplyFilters
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: SearchFilters = {};
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  const statusOptions = Object.values(PropertyStatus);
  const propertyTypeOptions = [
    'Single Family',
    'Condo',
    'Townhouse',
    'Multi-Family',
    'Land',
    'Commercial'
  ];

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Filters</Typography>
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
        </Stack>

        <Stack spacing={3}>
          {/* Status Filter */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <InputLabel>Property Status</InputLabel>
                <Select
                  multiple
                  value={localFilters.status || []}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.replace('_', ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Property Type Filter */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Property Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  multiple
                  value={localFilters.propertyType || []}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {propertyTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Price Range */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Price Range</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  label="Min Price"
                  type="number"
                  value={localFilters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                  InputProps={{ startAdornment: '$' }}
                />
                <TextField
                  label="Max Price"
                  type="number"
                  value={localFilters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  InputProps={{ startAdornment: '$' }}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Bedrooms & Bathrooms */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Bedrooms & Bathrooms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Min Bedrooms"
                    type="number"
                    value={localFilters.minBedrooms || ''}
                    onChange={(e) => handleFilterChange('minBedrooms', e.target.value ? Number(e.target.value) : undefined)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Max Bedrooms"
                    type="number"
                    value={localFilters.maxBedrooms || ''}
                    onChange={(e) => handleFilterChange('maxBedrooms', e.target.value ? Number(e.target.value) : undefined)}
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Min Bathrooms"
                    type="number"
                    value={localFilters.minBathrooms || ''}
                    onChange={(e) => handleFilterChange('minBathrooms', e.target.value ? Number(e.target.value) : undefined)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Max Bathrooms"
                    type="number"
                    value={localFilters.maxBathrooms || ''}
                    onChange={(e) => handleFilterChange('maxBathrooms', e.target.value ? Number(e.target.value) : undefined)}
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Square Feet */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Square Feet</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  label="Min Square Feet"
                  type="number"
                  value={localFilters.minSquareFeet || ''}
                  onChange={(e) => handleFilterChange('minSquareFeet', e.target.value ? Number(e.target.value) : undefined)}
                />
                <TextField
                  label="Max Square Feet"
                  type="number"
                  value={localFilters.maxSquareFeet || ''}
                  onChange={(e) => handleFilterChange('maxSquareFeet', e.target.value ? Number(e.target.value) : undefined)}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Year Built */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Year Built</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  label="Min Year"
                  type="number"
                  value={localFilters.minYearBuilt || ''}
                  onChange={(e) => handleFilterChange('minYearBuilt', e.target.value ? Number(e.target.value) : undefined)}
                />
                <TextField
                  label="Max Year"
                  type="number"
                  value={localFilters.maxYearBuilt || ''}
                  onChange={(e) => handleFilterChange('maxYearBuilt', e.target.value ? Number(e.target.value) : undefined)}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Location */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Location</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  label="City"
                  value={localFilters.city?.join(', ') || ''}
                  onChange={(e) => handleFilterChange('city', e.target.value ? e.target.value.split(',').map(s => s.trim()) : [])}
                  placeholder="Enter cities separated by commas"
                />
                <TextField
                  label="State"
                  value={localFilters.state?.join(', ') || ''}
                  onChange={(e) => handleFilterChange('state', e.target.value ? e.target.value.split(',').map(s => s.trim()) : [])}
                  placeholder="Enter states separated by commas"
                />
                <TextField
                  label="ZIP Code"
                  value={localFilters.zipCode?.join(', ') || ''}
                  onChange={(e) => handleFilterChange('zipCode', e.target.value ? e.target.value.split(',').map(s => s.trim()) : [])}
                  placeholder="Enter ZIP codes separated by commas"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Divider />

          <Button
            variant="contained"
            fullWidth
            onClick={handleApplyFilters}
            size="large"
          >
            Apply Filters
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default FilterPanel;
