const { sequelize } = require('../config/database');
require('dotenv').config();

async function exploreSchema() {
  try {
    console.log('🔍 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected successfully!');

    // Get all schemas
    console.log('\n📋 Available schemas:');
    const schemas = await sequelize.query(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')",
      { type: sequelize.QueryTypes.SELECT }
    );
    schemas.forEach(schema => console.log(`  - ${schema.schema_name}`));

    // Check if mls_data schema exists
    const mlsSchema = schemas.find(s => s.schema_name === 'mls_data');
    if (!mlsSchema) {
      console.log('\n❌ mls_data schema not found!');
      return;
    }

    console.log('\n🏠 Tables in mls_data schema:');
    const tables = await sequelize.query(
      `SELECT table_name, table_type 
       FROM information_schema.tables 
       WHERE table_schema = 'mls_data' 
       ORDER BY table_name`,
      { type: sequelize.QueryTypes.SELECT }
    );
    
    tables.forEach(table => {
      console.log(`  - ${table.table_name} (${table.table_type})`);
    });

    // Get detailed info for each table
    for (const table of tables) {
      console.log(`\n📊 Structure of ${table.table_name}:`);
      const columns = await sequelize.query(
        `SELECT column_name, data_type, is_nullable, column_default, character_maximum_length
         FROM information_schema.columns 
         WHERE table_schema = 'mls_data' AND table_name = '${table.table_name}'
         ORDER BY ordinal_position`,
        { type: sequelize.QueryTypes.SELECT }
      );
      
      columns.forEach(col => {
        const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        console.log(`    ${col.column_name}: ${col.data_type}${length} ${nullable}${defaultVal}`);
      });

      // Get row count
      const countResult = await sequelize.query(
        `SELECT COUNT(*) as count FROM mls_data."${table.table_name}"`,
        { type: sequelize.QueryTypes.SELECT }
      );
      console.log(`    Rows: ${countResult[0].count}`);
    }

    // Get sample data from the first table
    if (tables.length > 0) {
      console.log(`\n🔍 Sample data from ${tables[0].table_name}:`);
      const sampleData = await sequelize.query(
        `SELECT * FROM mls_data."${tables[0].table_name}" LIMIT 5`,
        { type: sequelize.QueryTypes.SELECT }
      );
      console.log(JSON.stringify(sampleData, null, 2));
    }

  } catch (error) {
    console.error('❌ Error exploring schema:', error.message);
  } finally {
    await sequelize.close();
  }
}

// Run if called directly
if (require.main === module) {
  exploreSchema();
}

module.exports = { exploreSchema };
