const express = require('express');
const { Op } = require('sequelize');
const { Property } = require('../models');
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
      whereClause[Op.or] = [
        { address: { [Op.iLike]: `%${query}%` } },
        { mlsNumber: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } },
        { city: { [Op.iLike]: `%${query}%` } }
      ];
    }

    // Status filter
    if (status && status.length > 0) {
      whereClause.status = { [Op.in]: status };
    }

    // Property type filter
    if (propertyType && propertyType.length > 0) {
      whereClause.propertyType = { [Op.in]: propertyType };
    }

    // Price range
    if (minPrice !== undefined) {
      whereClause.price = { ...whereClause.price, [Op.gte]: minPrice };
    }
    if (maxPrice !== undefined) {
      whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
    }

    // Bedrooms range
    if (minBedrooms !== undefined) {
      whereClause.bedrooms = { ...whereClause.bedrooms, [Op.gte]: minBedrooms };
    }
    if (maxBedrooms !== undefined) {
      whereClause.bedrooms = { ...whereClause.bedrooms, [Op.lte]: maxBedrooms };
    }

    // Bathrooms range
    if (minBathrooms !== undefined) {
      whereClause.bathrooms = { ...whereClause.bathrooms, [Op.gte]: minBathrooms };
    }
    if (maxBathrooms !== undefined) {
      whereClause.bathrooms = { ...whereClause.bathrooms, [Op.lte]: maxBathrooms };
    }

    // Square feet range
    if (minSquareFeet !== undefined) {
      whereClause.squareFeet = { ...whereClause.squareFeet, [Op.gte]: minSquareFeet };
    }
    if (maxSquareFeet !== undefined) {
      whereClause.squareFeet = { ...whereClause.squareFeet, [Op.lte]: maxSquareFeet };
    }

    // Year built range
    if (minYearBuilt !== undefined) {
      whereClause.yearBuilt = { ...whereClause.yearBuilt, [Op.gte]: minYearBuilt };
    }
    if (maxYearBuilt !== undefined) {
      whereClause.yearBuilt = { ...whereClause.yearBuilt, [Op.lte]: maxYearBuilt };
    }

    // Date listed range
    if (dateListedFrom) {
      whereClause.dateListed = { ...whereClause.dateListed, [Op.gte]: new Date(dateListedFrom) };
    }
    if (dateListedTo) {
      whereClause.dateListed = { ...whereClause.dateListed, [Op.lte]: new Date(dateListedTo) };
    }

    // Date sold range
    if (dateSoldFrom) {
      whereClause.dateSold = { ...whereClause.dateSold, [Op.gte]: new Date(dateSoldFrom) };
    }
    if (dateSoldTo) {
      whereClause.dateSold = { ...whereClause.dateSold, [Op.lte]: new Date(dateSoldTo) };
    }

    // Location filters
    if (city && city.length > 0) {
      whereClause.city = { [Op.in]: city };
    }
    if (state && state.length > 0) {
      whereClause.state = { [Op.in]: state };
    }
    if (zipCode && zipCode.length > 0) {
      whereClause.zipCode = { [Op.in]: zipCode };
    }

    // Days on market range
    if (minDaysOnMarket !== undefined) {
      whereClause.daysOnMarket = { ...whereClause.daysOnMarket, [Op.gte]: minDaysOnMarket };
    }
    if (maxDaysOnMarket !== undefined) {
      whereClause.daysOnMarket = { ...whereClause.daysOnMarket, [Op.lte]: maxDaysOnMarket };
    }

    // Features filter (if features is an array)
    if (features && features.length > 0) {
      whereClause.features = { [Op.contains]: features };
    }

    const { count, rows: properties } = await Property.findAndCountAll({
      where: whereClause,
      limit: parseInt(pageSize),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
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

    const stats = await Property.findAll({
      where: whereClause,
      attributes: [
        [Property.sequelize.fn('COUNT', Property.sequelize.col('id')), 'totalProperties'],
        [Property.sequelize.fn('AVG', Property.sequelize.col('price')), 'avgPrice'],
        [Property.sequelize.fn('MIN', Property.sequelize.col('price')), 'minPrice'],
        [Property.sequelize.fn('MAX', Property.sequelize.col('price')), 'maxPrice'],
        [Property.sequelize.fn('AVG', Property.sequelize.col('squareFeet')), 'avgSquareFeet'],
        [Property.sequelize.fn('AVG', Property.sequelize.col('daysOnMarket')), 'avgDaysOnMarket']
      ],
      raw: true
    });

    res.json({
      success: true,
      data: stats[0] || {}
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
      Property.findAll({
        attributes: ['status'],
        group: ['status'],
        raw: true
      }),
      Property.findAll({
        attributes: ['propertyType'],
        group: ['propertyType'],
        raw: true
      }),
      Property.findAll({
        attributes: ['city'],
        group: ['city'],
        order: [['city', 'ASC']],
        raw: true
      }),
      Property.findAll({
        attributes: ['state'],
        group: ['state'],
        order: [['state', 'ASC']],
        raw: true
      }),
      Property.findAll({
        attributes: ['zipCode'],
        group: ['zipCode'],
        order: [['zipCode', 'ASC']],
        raw: true
      })
    ]);

    res.json({
      success: true,
      data: {
        statuses: statuses.map(s => s.status),
        propertyTypes: propertyTypes.map(p => p.propertyType),
        cities: cities.map(c => c.city),
        states: states.map(s => s.state),
        zipCodes: zipCodes.map(z => z.zipCode)
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
