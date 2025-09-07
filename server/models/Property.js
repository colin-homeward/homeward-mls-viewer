const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  mlsNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'mls_number'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
    field: 'zip_code'
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('FOR_SALE', 'SOLD', 'PENDING', 'WITHDRAWN', 'EXPIRED'),
    allowNull: false,
    defaultValue: 'FOR_SALE'
  },
  propertyType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'property_type'
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  bathrooms: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false,
    defaultValue: 0
  },
  squareFeet: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'square_feet'
  },
  lotSize: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'lot_size'
  },
  yearBuilt: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'year_built'
  },
  dateListed: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'date_listed'
  },
  dateSold: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'date_sold'
  },
  daysOnMarket: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'days_on_market'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  agentName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'agent_name'
  },
  agentPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'agent_phone'
  },
  agentEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'agent_email'
  },
  brokerName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'broker_name'
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  }
}, {
  tableName: 'properties',
  schema: 'mls_data',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['mls_number']
    },
    {
      fields: ['status']
    },
    {
      fields: ['property_type']
    },
    {
      fields: ['city', 'state']
    },
    {
      fields: ['price']
    },
    {
      fields: ['date_listed']
    },
    {
      fields: ['date_sold']
    },
    {
      fields: ['bedrooms', 'bathrooms']
    },
    {
      fields: ['square_feet']
    }
  ]
});

module.exports = { Property };
