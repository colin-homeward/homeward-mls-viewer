#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  console.log('🏠 Homeward MLS Data Viewing - Setup Wizard\n');
  
  console.log('This will help you configure the application to connect to your RDS database.\n');
  
  const dbHost = await question('Enter your RDS host (e.g., your-db.amazonaws.com): ');
  const dbPort = await question('Enter your RDS port (default: 5432): ') || '5432';
  const dbName = await question('Enter your database name: ');
  const dbUser = await question('Enter your database username: ');
  const dbPassword = await question('Enter your database password: ');
  
  const envContent = `# Database Configuration
DB_HOST=${dbHost}
DB_PORT=${dbPort}
DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD=${dbPassword}

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000
`;

  const envPath = path.join(__dirname, 'server', '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    
    console.log('\n🔍 Testing database connection...');
    
    // Test the connection
    const { testConnection } = require('./server/scripts/test-connection');
    await testConnection();
    
    console.log('\n🚀 Setup complete! You can now run:');
    console.log('   npm run dev');
    console.log('\nThis will start both the backend server and frontend development server.');
    
  } catch (error) {
    console.error('\n❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

setup().catch(console.error);
