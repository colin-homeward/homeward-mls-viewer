import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Skeleton
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Bed as BedIcon,
  Bathroom as BathIcon,
  SquareFoot as SquareFootIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { Property, PropertyStatus } from '../types';

interface PropertyGridProps {
  properties: Property[];
  totalCount: number;
  isLoading: boolean;
  error: any;
  onPropertySelect: (property: Property) => void;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  totalCount,
  isLoading,
  error,
  onPropertySelect,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.FOR_SALE:
        return 'success';
      case PropertyStatus.SOLD:
        return 'default';
      case PropertyStatus.PENDING:
        return 'warning';
      case PropertyStatus.WITHDRAWN:
        return 'error';
      case PropertyStatus.EXPIRED:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusStyle = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.FOR_SALE:
        return {
          backgroundColor: '#dcfce7',
          color: '#166534',
          fontWeight: 600,
        };
      case PropertyStatus.SOLD:
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          fontWeight: 600,
        };
      case PropertyStatus.PENDING:
        return {
          backgroundColor: '#fef3c7',
          color: '#92400e',
          fontWeight: 600,
        };
      case PropertyStatus.WITHDRAWN:
        return {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          fontWeight: 600,
        };
      case PropertyStatus.EXPIRED:
        return {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          fontWeight: 600,
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          fontWeight: 600,
        };
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={() => onPropertySelect(property)}
    >
      {property.images && property.images.length > 0 ? (
        <CardMedia
          component="img"
          height="200"
          image={property.images[0]}
          alt={property.address}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            color: 'grey.500',
          }}
        >
          <Typography variant="body2">No Image Available</Typography>
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" component="h3" noWrap sx={{ flex: 1, mr: 1 }}>
            {formatPrice(property.price)}
          </Typography>
          <Chip
            label={property.status.replace('_', ' ')}
            size="small"
            sx={getStatusStyle(property.status)}
          />
        </Stack>

        <Typography variant="body2" color="text.secondary" noWrap mb={1}>
          <LocationIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
          {property.address}, {property.city}, {property.state} {property.zipCode}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          MLS #{property.mlsNumber}
        </Typography>

        <Stack direction="row" spacing={2} mb={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <BedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {property.bedrooms}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <BathIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {property.bathrooms}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <SquareFootIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {property.squareFeet?.toLocaleString()} sq ft
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt="auto">
          <Typography variant="body2" color="text.secondary">
            <CalendarIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
            Listed: {formatDate(property.dateListed)}
          </Typography>
          {property.daysOnMarket > 0 && (
            <Typography variant="body2" color="text.secondary">
              {property.daysOnMarket} days
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  const PropertySkeleton = () => (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={32} />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" height={20} />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading properties: {error.message || 'Unknown error'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isLoading ? 'Loading properties...' : `${totalCount.toLocaleString()} Properties`}
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Per Page</InputLabel>
              <Select
                value={pageSize}
                label="Per Page"
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>

      {/* Properties Grid */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {isLoading ? (
          <Grid container spacing={2}>
            {Array.from({ length: pageSize }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <PropertySkeleton />
              </Grid>
            ))}
          </Grid>
        ) : properties.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No properties found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Pagination */}
      {totalCount > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Pagination
              count={Math.ceil(totalCount / pageSize)}
              page={page}
              onChange={(_, newPage) => onPageChange(newPage)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default PropertyGrid;
