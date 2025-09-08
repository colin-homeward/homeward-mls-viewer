const express = require('express');
const { mockDatabase } = require('../scripts/mock-data');
const router = express.Router();

// Search properties with filters
router.post('/properties', async (req, res) => {
  try {
    const {
      query,
      status,
      propertyType,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      minBathrooms,
      maxBathrooms,
      minSquareFeet,
      maxSquareFeet,
      minYearBuilt,
      maxYearBuilt,
      dateListedFrom,
      dateListedTo,
      dateSoldFrom,
      dateSoldTo,
      city,
      state,
      zipCode,
      features,
      minDaysOnMarket,
      maxDaysOnMarket,
      page = 1,
      pageSize = 20
    } = req.body;

    const offset = (page - 1) * pageSize;
    const whereClause = {};

    // Text search
    if (query) {
      whereClause.$or = [
        { address: { $iLike: `%${query}%` } },
        { mlsNumber: { $iLike: `%${query}%` } },
        { description: { $iLike: `%${query}%` } },
        { city: { $iLike: `%${query}%` } }
      ];
    }

    // Status filter
    if (status && status.length > 0) {
      whereClause.status = { $in: status };
    }

    // Property type filter
    if (propertyType && propertyType.length > 0) {
      whereClause.propertyType = { $in: propertyType };
    }

    // Price range
    if (minPrice !== undefined) {
      whereClause.price = { ...whereClause.price, $gte: minPrice };
    }
    if (maxPrice !== undefined) {
      whereClause.price = { ...whereClause.price, $lte: maxPrice };
    }

    // Bedrooms range
    if (minBedrooms !== undefined) {
      whereClause.bedrooms = { ...whereClause.bedrooms, $gte: minBedrooms };
    }
    if (maxBedrooms !== undefined) {
      whereClause.bedrooms = { ...whereClause.bedrooms, $lte: maxBedrooms };
    }

    // Bathrooms range
    if (minBathrooms !== undefined) {
      whereClause.bathrooms = { ...whereClause.bathrooms, $gte: minBathrooms };
    }
    if (maxBathrooms !== undefined) {
      whereClause.bathrooms = { ...whereClause.bathrooms, $lte: maxBathrooms };
    }

    // Square feet range
    if (minSquareFeet !== undefined) {
      whereClause.squareFeet = { ...whereClause.squareFeet, $gte: minSquareFeet };
    }
    if (maxSquareFeet !== undefined) {
      whereClause.squareFeet = { ...whereClause.squareFeet, $lte: maxSquareFeet };
    }

    // Year built range
    if (minYearBuilt !== undefined) {
      whereClause.yearBuilt = { ...whereClause.yearBuilt, $gte: minYearBuilt };
    }
    if (maxYearBuilt !== undefined) {
      whereClause.yearBuilt = { ...whereClause.yearBuilt, $lte: maxYearBuilt };
    }

    // Date listed range
    if (dateListedFrom) {
      whereClause.dateListed = { ...whereClause.dateListed, $gte: new Date(dateListedFrom) };
    }
    if (dateListedTo) {
      whereClause.dateListed = { ...whereClause.dateListed, $lte: new Date(dateListedTo) };
    }

    // Date sold range
    if (dateSoldFrom) {
      whereClause.dateSold = { ...whereClause.dateSold, $gte: new Date(dateSoldFrom) };
    }
    if (dateSoldTo) {
      whereClause.dateSold = { ...whereClause.dateSold, $lte: new Date(dateSoldTo) };
    }

    // Location filters
    if (city && city.length > 0) {
      whereClause.city = { $in: city };
    }
    if (state && state.length > 0) {
      whereClause.state = { $in: state };
    }
    if (zipCode && zipCode.length > 0) {
      whereClause.zipCode = { $in: zipCode };
    }

    // Days on market range
    if (minDaysOnMarket !== undefined) {
      whereClause.daysOnMarket = { ...whereClause.daysOnMarket, $gte: minDaysOnMarket };
    }
    if (maxDaysOnMarket !== undefined) {
      whereClause.daysOnMarket = { ...whereClause.daysOnMarket, $lte: maxDaysOnMarket };
    }

    // Features filter (if features is an array)
    if (features && features.length > 0) {
      whereClause.features = { $contains: features };
    }

    const { count, rows: properties } = await mockDatabase.findAndCountAll({
      where: whereClause,
      limit: parseInt(pageSize),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        properties,
        totalCount: count,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        totalPages: Math.ceil(count / pageSize)
      }
    });
  } catch (error) {
    console.error('Error searching properties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search properties'
    });
  }
});

// Get property statistics
router.post('/stats', async (req, res) => {
  try {
    const filters = req.body;
    
    // Build where clause similar to search
    const whereClause = buildWhereClause(filters);

    const stats = await mockDatabase.getStats(whereClause);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// Get available filter options
router.get('/filter-options', async (req, res) => {
  try {
    const [statuses, propertyTypes, cities, states, zipCodes] = await Promise.all([
      mockDatabase.getUniqueValues('status'),
      mockDatabase.getUniqueValues('propertyType'),
      mockDatabase.getUniqueValues('city'),
      mockDatabase.getUniqueValues('state'),
      mockDatabase.getUniqueValues('zipCode')
    ]);

    res.json({
      success: true,
      data: {
        statuses: statuses.map(s => s.status),
        propertyTypes: propertyTypes.map(p => p.propertyType),
        cities: cities.map(c => c.city).sort(),
        states: states.map(s => s.state).sort(),
        zipCodes: zipCodes.map(z => z.zipCode).sort()
      }
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch filter options'
    });
  }
});

// Helper function to build where clause for stats
function buildWhereClause(filters) {
  const whereClause = {};
  
  // Add similar logic as in search route
  // This is a simplified version - you might want to extract this to a shared utility
  
  return whereClause;
}

module.exports = router;
