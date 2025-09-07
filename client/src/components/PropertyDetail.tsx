import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Bed as BedIcon,
  Bathroom as BathIcon,
  SquareFoot as SquareFootIcon,
  CalendarToday as CalendarIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { Property, PropertyStatus } from '../types';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Property Details</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {/* Property Images */}
        {property.images && property.images.length > 0 && (
          <Box sx={{ p: 2 }}>
            <img
              src={property.images[0]}
              alt={property.address}
              style={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </Box>
        )}

        <Box sx={{ p: 2 }}>
          {/* Price and Status */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h4" component="h2">
              {formatPrice(property.price)}
            </Typography>
            <Chip
              label={property.status.replace('_', ' ')}
              color={getStatusColor(property.status) as any}
              size="medium"
            />
          </Stack>

          {/* Address */}
          <Typography variant="h6" gutterBottom>
            <LocationIcon sx={{ fontSize: 20, mr: 1, verticalAlign: 'middle' }} />
            {property.address}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {property.city}, {property.state} {property.zipCode}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Property Details */}
          <Typography variant="h6" gutterBottom>
            Property Details
          </Typography>
          
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <BedIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{property.bedrooms}</Typography>
                <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <BathIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{property.bathrooms}</Typography>
                <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <SquareFootIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{property.squareFeet?.toLocaleString()}</Typography>
                <Typography variant="body2" color="text.secondary">Sq Ft</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <HomeIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{property.yearBuilt}</Typography>
                <Typography variant="body2" color="text.secondary">Year Built</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Additional Details */}
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText
                primary="Date Listed"
                secondary={formatDate(property.dateListed)}
              />
            </ListItem>
            {property.dateSold && (
              <ListItem>
                <ListItemIcon>
                  <CalendarIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Date Sold"
                  secondary={formatDate(property.dateSold)}
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText
                primary="Days on Market"
                secondary={property.daysOnMarket}
              />
            </ListItem>
            {property.lotSize && (
              <ListItem>
                <ListItemIcon>
                  <SquareFootIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Lot Size"
                  secondary={`${property.lotSize.toLocaleString()} sq ft`}
                />
              </ListItem>
            )}
          </List>

          {/* Description */}
          {property.description && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" paragraph>
                {property.description}
              </Typography>
            </>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {property.features.map((feature, index) => (
                  <Chip key={index} label={feature} size="small" />
                ))}
              </Stack>
            </>
          )}

          {/* Agent Information */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Agent Information
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Agent"
                secondary={property.agentName}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Phone"
                secondary={property.agentPhone}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText
                primary="Email"
                secondary={property.agentEmail}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText
                primary="Broker"
                secondary={property.brokerName}
              />
            </ListItem>
          </List>

          {/* MLS Information */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            MLS Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            MLS Number: {property.mlsNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Updated: {formatDate(property.updatedAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetail;
