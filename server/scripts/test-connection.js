const { sequelize } = require('../config/database');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`User: ${process.env.DB_USER}`);
    
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const result = await sequelize.query('SELECT NOW() as current_time', {
      type: sequelize.QueryTypes.SELECT
    });
    console.log('🕐 Current database time:', result[0].current_time);
    
    // Check if mls_data schema exists
    const schemas = await sequelize.query(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'mls_data'",
      { type: sequelize.QueryTypes.SELECT }
    );
    
    if (schemas.length > 0) {
      console.log('✅ mls_data schema found!');
    } else {
      console.log('❌ mls_data schema not found!');
      console.log('Available schemas:');
      const allSchemas = await sequelize.query(
        "SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')",
        { type: sequelize.QueryTypes.SELECT }
      );
      allSchemas.forEach(schema => console.log(`  - ${schema.schema_name}`));
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Please check your environment variables in .env file');
  } finally {
    await sequelize.close();
  }
}

// Run if called directly
if (require.main === module) {
  testConnection();
}

module.exports = { testConnection };
