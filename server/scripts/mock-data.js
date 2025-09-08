// Mock data for development and testing
const mockProperties = [
  {
    id: '1',
    mlsNumber: 'MLS001',
    address: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    price: 450000,
    status: 'FOR_SALE',
    propertyType: 'Single Family',
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2200,
    lotSize: 8000,
    yearBuilt: 2015,
    dateListed: '2024-01-15',
    daysOnMarket: 25,
    description: 'Beautiful modern home in downtown Austin with open floor plan and updated kitchen.',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
    features: ['Hardwood Floors', 'Updated Kitchen', 'Central Air', 'Garage'],
    agentName: 'John Smith',
    agentPhone: '(512) 555-0123',
    agentEmail: 'john.smith@realestate.com',
    brokerName: 'Austin Realty Group',
    latitude: 30.2672,
    longitude: -97.7431,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    mlsNumber: 'MLS002',
    address: '456 Oak Avenue',
    city: 'Austin',
    state: 'TX',
    zipCode: '78702',
    price: 325000,
    status: 'SOLD',
    propertyType: 'Condo',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    yearBuilt: 2018,
    dateListed: '2023-11-01',
    dateSold: '2023-12-15',
    daysOnMarket: 44,
    description: 'Modern condo with city views and premium amenities.',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    features: ['City Views', 'Pool', 'Fitness Center', 'Concierge'],
    agentName: 'Sarah Johnson',
    agentPhone: '(512) 555-0456',
    agentEmail: 'sarah.johnson@realestate.com',
    brokerName: 'Austin Realty Group',
    latitude: 30.2672,
    longitude: -97.7431,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    mlsNumber: 'MLS003',
    address: '789 Pine Street',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    price: 675000,
    status: 'FOR_SALE',
    propertyType: 'Single Family',
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3200,
    lotSize: 12000,
    yearBuilt: 2020,
    dateListed: '2024-02-01',
    daysOnMarket: 12,
    description: 'Luxury home with custom finishes and resort-style backyard.',
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
    features: ['Custom Kitchen', 'Master Suite', 'Pool', 'Three-Car Garage'],
    agentName: 'Mike Davis',
    agentPhone: '(214) 555-0789',
    agentEmail: 'mike.davis@realestate.com',
    brokerName: 'Dallas Premier Realty',
    latitude: 32.7767,
    longitude: -96.7970,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    mlsNumber: 'MLS004',
    address: '321 Elm Drive',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    price: 285000,
    status: 'PENDING',
    propertyType: 'Townhouse',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    yearBuilt: 2017,
    dateListed: '2024-01-20',
    daysOnMarket: 18,
    description: 'Charming townhouse in historic district with modern updates.',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    features: ['Historic District', 'Updated Bathrooms', 'Private Patio', 'Attached Garage'],
    agentName: 'Lisa Wilson',
    agentPhone: '(713) 555-0321',
    agentEmail: 'lisa.wilson@realestate.com',
    brokerName: 'Houston Heritage Realty',
    latitude: 29.7604,
    longitude: -95.3698,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    mlsNumber: 'MLS005',
    address: '654 Maple Lane',
    city: 'San Antonio',
    state: 'TX',
    zipCode: '78201',
    price: 425000,
    status: 'FOR_SALE',
    propertyType: 'Single Family',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2100,
    lotSize: 9000,
    yearBuilt: 2012,
    dateListed: '2024-02-10',
    daysOnMarket: 5,
    description: 'Spacious family home with large backyard and updated features.',
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
    features: ['Large Backyard', 'Updated Kitchen', 'Hardwood Floors', 'Two-Car Garage'],
    agentName: 'Robert Brown',
    agentPhone: '(210) 555-0654',
    agentEmail: 'robert.brown@realestate.com',
    brokerName: 'San Antonio Realty',
    latitude: 29.4241,
    longitude: -98.4936,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    mlsNumber: 'MLS006',
    address: '987 Cedar Court',
    city: 'Austin',
    state: 'TX',
    zipCode: '78703',
    price: 850000,
    status: 'FOR_SALE',
    propertyType: 'Single Family',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4200,
    lotSize: 15000,
    yearBuilt: 2021,
    dateListed: '2024-01-05',
    daysOnMarket: 35,
    description: 'Stunning contemporary home with panoramic hill country views.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c2039eb?w=800'],
    features: ['Hill Country Views', 'Smart Home', 'Wine Cellar', 'Guest House'],
    agentName: 'Jennifer Martinez',
    agentPhone: '(512) 555-0987',
    agentEmail: 'jennifer.martinez@realestate.com',
    brokerName: 'Austin Luxury Realty',
    latitude: 30.2672,
    longitude: -97.7431,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    mlsNumber: 'MLS007',
    address: '147 Birch Street',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75205',
    price: 195000,
    status: 'SOLD',
    propertyType: 'Condo',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 850,
    yearBuilt: 2019,
    dateListed: '2023-10-15',
    dateSold: '2023-11-30',
    daysOnMarket: 46,
    description: 'Cozy downtown condo perfect for urban living.',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    features: ['Downtown Location', 'Rooftop Deck', 'Fitness Center', 'Concierge'],
    agentName: 'Michael Chen',
    agentPhone: '(214) 555-0147',
    agentEmail: 'michael.chen@realestate.com',
    brokerName: 'Dallas Urban Realty',
    latitude: 32.7767,
    longitude: -96.7970,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    mlsNumber: 'MLS008',
    address: '258 Spruce Avenue',
    city: 'Houston',
    state: 'TX',
    zipCode: '77019',
    price: 750000,
    status: 'FOR_SALE',
    propertyType: 'Single Family',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    lotSize: 10000,
    yearBuilt: 2016,
    dateListed: '2024-02-15',
    daysOnMarket: 8,
    description: 'Elegant home in prestigious neighborhood with mature landscaping.',
    images: ['https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'],
    features: ['Mature Landscaping', 'Formal Dining', 'Study', 'Pool'],
    agentName: 'Amanda Taylor',
    agentPhone: '(713) 555-0258',
    agentEmail: 'amanda.taylor@realestate.com',
    brokerName: 'Houston Elite Realty',
    latitude: 29.7604,
    longitude: -95.3698,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// In-memory storage for mock data
let properties = [...mockProperties];

// Mock database functions
const mockDatabase = {
  // Get all properties with pagination and filtering
  findAndCountAll: async (options = {}) => {
    let filteredProperties = [...properties];
    
    // Apply filters
    if (options.where) {
      const where = options.where;
      
      // Text search
      if (where.$or) {
        const searchTerm = where.$or[0].address.$iLike?.replace(/%/g, '') || '';
        filteredProperties = filteredProperties.filter(prop => 
          prop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.mlsNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Status filter
      if (where.status && where.status.$in) {
        filteredProperties = filteredProperties.filter(prop => 
          where.status.$in.includes(prop.status)
        );
      }
      
      // Property type filter
      if (where.propertyType && where.propertyType.$in) {
        filteredProperties = filteredProperties.filter(prop => 
          where.propertyType.$in.includes(prop.propertyType)
        );
      }
      
      // Price range
      if (where.price) {
        if (where.price.$gte) {
          filteredProperties = filteredProperties.filter(prop => prop.price >= where.price.$gte);
        }
        if (where.price.$lte) {
          filteredProperties = filteredProperties.filter(prop => prop.price <= where.price.$lte);
        }
      }
      
      // Bedrooms range
      if (where.bedrooms) {
        if (where.bedrooms.$gte) {
          filteredProperties = filteredProperties.filter(prop => prop.bedrooms >= where.bedrooms.$gte);
        }
        if (where.bedrooms.$lte) {
          filteredProperties = filteredProperties.filter(prop => prop.bedrooms <= where.bedrooms.$lte);
        }
      }
      
      // Bathrooms range
      if (where.bathrooms) {
        if (where.bathrooms.$gte) {
          filteredProperties = filteredProperties.filter(prop => prop.bathrooms >= where.bathrooms.$gte);
        }
        if (where.bathrooms.$lte) {
          filteredProperties = filteredProperties.filter(prop => prop.bathrooms <= where.bathrooms.$lte);
        }
      }
      
      // Square feet range
      if (where.squareFeet) {
        if (where.squareFeet.$gte) {
          filteredProperties = filteredProperties.filter(prop => prop.squareFeet >= where.squareFeet.$gte);
        }
        if (where.squareFeet.$lte) {
          filteredProperties = filteredProperties.filter(prop => prop.squareFeet <= where.squareFeet.$lte);
        }
      }
      
      // Year built range
      if (where.yearBuilt) {
        if (where.yearBuilt.$gte) {
          filteredProperties = filteredProperties.filter(prop => prop.yearBuilt >= where.yearBuilt.$gte);
        }
        if (where.yearBuilt.$lte) {
          filteredProperties = filteredProperties.filter(prop => prop.yearBuilt <= where.yearBuilt.$lte);
        }
      }
      
      // City filter
      if (where.city && where.city.$in) {
        filteredProperties = filteredProperties.filter(prop => 
          where.city.$in.includes(prop.city)
        );
      }
      
      // State filter
      if (where.state && where.state.$in) {
        filteredProperties = filteredProperties.filter(prop => 
          where.state.$in.includes(prop.state)
        );
      }
      
      // ZIP code filter
      if (where.zipCode && where.zipCode.$in) {
        filteredProperties = filteredProperties.filter(prop => 
          where.zipCode.$in.includes(prop.zipCode)
        );
      }
    }
    
    // Apply pagination
    const totalCount = filteredProperties.length;
    const limit = options.limit || 20;
    const offset = options.offset || 0;
    const paginatedProperties = filteredProperties.slice(offset, offset + limit);
    
    return {
      count: totalCount,
      rows: paginatedProperties
    };
  },
  
  // Get property by ID
  findByPk: async (id) => {
    return properties.find(prop => prop.id === id) || null;
  },
  
  // Get unique values for filters
  getUniqueValues: async (field) => {
    const values = [...new Set(properties.map(prop => prop[field]))].filter(Boolean);
    return values.map(value => ({ [field]: value }));
  },
  
  // Get statistics
  getStats: async (filters = {}) => {
    let filteredProperties = [...properties];
    
    // Apply same filtering logic as findAndCountAll
    // (simplified for stats)
    
    const prices = filteredProperties.map(prop => prop.price).filter(Boolean);
    const squareFeet = filteredProperties.map(prop => prop.squareFeet).filter(Boolean);
    const daysOnMarket = filteredProperties.map(prop => prop.daysOnMarket).filter(Boolean);
    
    return {
      totalProperties: filteredProperties.length,
      avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
      avgSquareFeet: squareFeet.length > 0 ? Math.round(squareFeet.reduce((a, b) => a + b, 0) / squareFeet.length) : 0,
      avgDaysOnMarket: daysOnMarket.length > 0 ? Math.round(daysOnMarket.reduce((a, b) => a + b, 0) / daysOnMarket.length) : 0
    };
  }
};

module.exports = { mockDatabase, mockProperties };
