const { Property } = require('../models');
const { sequelize } = require('../config/database');
require('dotenv').config();

const demoProperties = [
  {
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
    dateListed: new Date('2024-01-15'),
    daysOnMarket: 25,
    description: 'Beautiful modern home in downtown Austin with open floor plan and updated kitchen.',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
    features: ['Hardwood Floors', 'Updated Kitchen', 'Central Air', 'Garage'],
    agentName: 'John Smith',
    agentPhone: '(512) 555-0123',
    agentEmail: 'john.smith@realestate.com',
    brokerName: 'Austin Realty Group',
    latitude: 30.2672,
    longitude: -97.7431
  },
  {
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
    dateListed: new Date('2023-11-01'),
    dateSold: new Date('2023-12-15'),
    daysOnMarket: 44,
    description: 'Modern condo with city views and premium amenities.',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    features: ['City Views', 'Pool', 'Fitness Center', 'Concierge'],
    agentName: 'Sarah Johnson',
    agentPhone: '(512) 555-0456',
    agentEmail: 'sarah.johnson@realestate.com',
    brokerName: 'Austin Realty Group',
    latitude: 30.2672,
    longitude: -97.7431
  },
  {
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
    dateListed: new Date('2024-02-01'),
    daysOnMarket: 12,
    description: 'Luxury home with custom finishes and resort-style backyard.',
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
    features: ['Custom Kitchen', 'Master Suite', 'Pool', 'Three-Car Garage'],
    agentName: 'Mike Davis',
    agentPhone: '(214) 555-0789',
    agentEmail: 'mike.davis@realestate.com',
    brokerName: 'Dallas Premier Realty',
    latitude: 32.7767,
    longitude: -96.7970
  },
  {
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
    dateListed: new Date('2024-01-20'),
    daysOnMarket: 18,
    description: 'Charming townhouse in historic district with modern updates.',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    features: ['Historic District', 'Updated Bathrooms', 'Private Patio', 'Attached Garage'],
    agentName: 'Lisa Wilson',
    agentPhone: '(713) 555-0321',
    agentEmail: 'lisa.wilson@realestate.com',
    brokerName: 'Houston Heritage Realty',
    latitude: 29.7604,
    longitude: -95.3698
  },
  {
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
    dateListed: new Date('2024-02-10'),
    daysOnMarket: 5,
    description: 'Spacious family home with large backyard and updated features.',
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
    features: ['Large Backyard', 'Updated Kitchen', 'Hardwood Floors', 'Two-Car Garage'],
    agentName: 'Robert Brown',
    agentPhone: '(210) 555-0654',
    agentEmail: 'robert.brown@realestate.com',
    brokerName: 'San Antonio Realty',
    latitude: 29.4241,
    longitude: -98.4936
  }
];

async function generateDemoData() {
  try {
    console.log('🔌 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');

    // Sync the models (create tables if they don't exist)
    console.log('🔄 Syncing database models...');
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    console.log('✅ Database models synced!');

    // Insert demo data
    console.log('📝 Inserting demo properties...');
    for (const propertyData of demoProperties) {
      await Property.create(propertyData);
    }
    console.log(`✅ Inserted ${demoProperties.length} demo properties!`);

    // Verify the data
    const count = await Property.count();
    console.log(`📊 Total properties in database: ${count}`);

    console.log('\n🎉 Demo data generation complete!');
    console.log('You can now start the application with: npm run dev');

  } catch (error) {
    console.error('❌ Error generating demo data:', error.message);
    console.error('Please check your database connection and try again.');
  } finally {
    await sequelize.close();
  }
}

// Run if called directly
if (require.main === module) {
  generateDemoData();
}

module.exports = { generateDemoData };
