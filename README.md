# Homeward MLS Data Viewing Application

A comprehensive web application for viewing and searching MLS (Multiple Listing Service) property data with advanced filtering capabilities.

## Features

- **Advanced Search**: Full-text search across property addresses, MLS numbers, and descriptions
- **Comprehensive Filtering**: Filter by status, property type, price range, bedrooms, bathrooms, square footage, year built, location, and more
- **Property Details**: Detailed property information with images, features, and agent contact information
- **Responsive Design**: Modern, mobile-friendly interface built with Material-UI
- **Real-time Data**: Direct connection to RDS database for live property data

## Tech Stack

### Frontend
- React 18 with TypeScript
- Material-UI (MUI) for components
- React Query for data fetching
- Axios for API calls

### Backend
- Node.js with Express
- Sequelize ORM for database operations
- PostgreSQL database (RDS)
- CORS and security middleware

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (RDS)
- Access to `mls_data` schema

## Installation

1. **Clone and setup the project:**
   ```bash
   cd homeward-mls-data-viewing
   npm run install:all
   ```

2. **Configure environment variables:**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```
   DB_HOST=your-rds-host.amazonaws.com
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   PORT=3001
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

3. **Explore the database schema:**
   ```bash
   cd server
   node scripts/explore-schema.js
   ```

4. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:3001
   - Frontend development server on http://localhost:3000

## Database Schema Exploration

Before connecting to your actual data, you can explore the `mls_data` schema using the provided script:

```bash
cd server
node scripts/explore-schema.js
```

This will:
- Connect to your RDS database
- List all schemas and tables
- Show table structures and sample data
- Help you understand the data format

## API Endpoints

### Properties
- `GET /api/properties` - List all properties with pagination
- `GET /api/properties/:id` - Get property by ID

### Search
- `POST /api/search/properties` - Search properties with filters
- `POST /api/search/stats` - Get property statistics
- `GET /api/search/filter-options` - Get available filter options

### Health
- `GET /api/health` - Health check endpoint

## Usage

1. **Search Properties**: Use the search bar to find properties by address, MLS number, or description
2. **Apply Filters**: Click the "Filters" button to open the filter panel and refine your search
3. **View Details**: Click on any property card to view detailed information in the right panel
4. **Navigate Results**: Use pagination controls to browse through search results

## Project Structure

```
homeward-mls-data-viewing/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── scripts/          # Utility scripts
│   └── middleware/       # Express middleware
└── package.json          # Root package configuration
```

## Development

### Backend Development
```bash
cd server
npm run dev
```

### Frontend Development
```bash
cd client
npm start
```

### Database Schema Updates
If you need to modify the database schema, update the models in `server/models/` and run:

```bash
cd server
node -e "require('./index.js')"
```

## Production Deployment

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Set production environment variables
3. Start the server:
   ```bash
   cd server
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
