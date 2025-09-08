const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5439,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres', // Redshift is PostgreSQL-compatible
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    // Redshift-specific options
    options: {
      useUTC: false,
      timezone: '+00:00'
    }
  },
  // Disable PostgreSQL-specific features that Redshift doesn't support
  define: {
    timestamps: false
  }
});

module.exports = { sequelize };
