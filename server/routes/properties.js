const express = require('express');
const { Property } = require('../models');
const router = express.Router();

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await Property.findByPk(id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch property'
    });
  }
});

// Get all properties (with basic pagination)
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 20, status } = req.query;
    const offset = (page - 1) * pageSize;
    
    const whereClause = {};
    if (status) {
      whereClause.status = status;
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
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch properties'
    });
  }
});

module.exports = router;
