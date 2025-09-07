import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  onToggleFilters: () => void;
  showFilters: boolean;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onToggleFilters,
  showFilters,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filters: SearchFilters = {};
    if (searchQuery.trim()) {
      filters.query = searchQuery.trim();
    }
    onSearch(filters);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch({});
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          fullWidth
          placeholder="Search properties by address, MLS number, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  sx={{ color: 'text.secondary' }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          variant={showFilters ? "contained" : "outlined"}
          startIcon={<FilterIcon />}
          onClick={onToggleFilters}
          disabled={isLoading}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Filters
        </Button>
        
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={isLoading}
          sx={{ 
            minWidth: 120,
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
            },
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchBar;
