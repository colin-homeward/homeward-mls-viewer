# Deployment Guide

## Frontend Deployment to Vercel

### 1. Prepare the Frontend

```bash
cd client
npm run build
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from client directory
cd client
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? homeward-mls-viewer
# - In which directory is your code located? ./
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `client`
5. Set build command to `npm run build`
6. Set output directory to `build`
7. Click "Deploy"

### 3. Configure Environment Variables

In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `REACT_APP_API_URL`: Your backend API URL (e.g., `https://homeward-mls-api.vercel.app/api`)

## Backend Deployment to Vercel

### 1. Deploy Backend API

```bash
cd server
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? homeward-mls-api
# - In which directory is your code located? ./
```

### 2. Configure Backend Environment Variables

In your Vercel dashboard for the backend project:
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `DB_HOST`: Your RDS host
   - `DB_PORT`: 5432
   - `DB_NAME`: Your database name
   - `DB_USER`: Your database username
   - `DB_PASSWORD`: Your database password
   - `NODE_ENV`: production
   - `CLIENT_URL`: Your frontend URL (e.g., `https://homeward-mls-viewer.vercel.app`)

### 3. Test the Deployment

1. Check your backend health endpoint: `https://homeward-mls-api.vercel.app/api/health`
2. Update your frontend's `REACT_APP_API_URL` to point to your backend
3. Test the full application

## Database Connection

### 1. Test Database Connection

```bash
# Test connection locally first
npm run test-connection

# Explore your database schema
npm run explore-schema
```

### 2. Update Property Model

If your database schema differs from the default model, update `server/models/Property.js` to match your actual schema.

### 3. Generate Demo Data (Optional)

```bash
npm run generate-demo
```

## Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update environment variables with the new domain

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `CLIENT_URL` is set correctly in your backend environment variables
2. **Database Connection**: Verify all database credentials are correct
3. **Build Errors**: Check that all dependencies are installed and TypeScript errors are resolved

### Logs

- Frontend logs: Available in Vercel dashboard under "Functions" tab
- Backend logs: Available in Vercel dashboard under "Functions" tab
- Database logs: Check your RDS console

## Production Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Vercel
- [ ] Database credentials configured
- [ ] CORS settings updated
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificates active
- [ ] Database connection tested
- [ ] Application functionality verified
