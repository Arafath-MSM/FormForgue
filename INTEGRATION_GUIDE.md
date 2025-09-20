# Form Builder - Backend Integration Guide

## Overview
This guide will help you integrate your React frontend with the Laravel backend to create a complete Form Builder application.

## Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL/MariaDB
- Node.js (for frontend)

## Quick Setup

### 1. Database Setup
First, create a MySQL database:
```sql
CREATE DATABASE form_builder;
```

### 2. Laravel Backend Setup

#### Option A: Using the setup script (Windows)
```bash
# Make sure you have PHP, Composer, and MySQL installed
# Update database credentials in backend/.env if needed
setup-laravel.bat
```

#### Option B: Using the setup script (Linux/Mac)
```bash
# Make sure you have PHP, Composer, and MySQL installed
# Update database credentials in backend/.env if needed
chmod +x setup-laravel.sh
./setup-laravel.sh
```

#### Option C: Manual setup
```bash
cd backend

# Install dependencies
composer install

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Start server
php artisan serve
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## What's Been Set Up

### Backend (Laravel)
- ✅ Database migrations for forms, fields, submissions, and answers
- ✅ Eloquent models with relationships
- ✅ API controllers with full CRUD operations
- ✅ CORS configuration for frontend communication
- ✅ Database seeders with sample forms
- ✅ API routes for all form operations

### Frontend (React)
- ✅ Updated TypeScript interfaces to match Laravel API
- ✅ API service with proper error handling
- ✅ FormContext updated for Laravel integration
- ✅ Forms page ready for API integration

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/forms` | Get all forms |
| POST | `/api/forms` | Create a new form |
| GET | `/api/forms/{id}` | Get a specific form |
| PUT | `/api/forms/{id}` | Update a form |
| DELETE | `/api/forms/{id}` | Delete a form |
| GET | `/api/forms/{id}/submissions` | Get form submissions |
| POST | `/api/forms/{id}/submissions` | Submit a form |
| GET | `/api/submissions/{id}` | Get submission details |

## Sample Data
The seeder creates three sample forms:
1. **Contact Form** - Basic contact form with name, email, and message
2. **Event Registration** - Event registration with multiple field types
3. **Product Feedback** - Product feedback form with ratings and categories

## Testing the Integration

1. Start both servers:
   - Laravel: `http://localhost:8000`
   - React: `http://localhost:5173`

2. Open the React app in your browser

3. You should see the three sample forms loaded from the Laravel API

4. Test the functionality:
   - View forms list
   - Create new forms
   - Edit existing forms
   - Preview forms
   - Submit forms
   - View submissions

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists

### CORS Issues
- Laravel CORS is configured to allow all origins
- Check browser console for CORS errors

### API Connection Issues
- Verify Laravel server is running on port 8000
- Check API_BASE_URL in frontend/src/services/api.ts
- Test API endpoints directly in browser/Postman

## Next Steps

After successful integration, you can:
1. Customize the UI/UX
2. Add authentication
3. Implement form validation
4. Add more field types
5. Implement drag-and-drop field reordering
6. Add form analytics
7. Deploy to production

## File Structure
```
FormForgue/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Models/         # Eloquent models
│   │   ├── Http/Controllers/ # API controllers
│   │   └── database/migrations/ # Database migrations
│   ├── config/             # Laravel configuration
│   ├── routes/api.php      # API routes
│   └── composer.json       # PHP dependencies
├── frontend/               # React application
│   ├── src/
│   │   ├── services/api.ts # API service
│   │   ├── types/form.ts   # TypeScript interfaces
│   │   ├── contexts/       # React contexts
│   │   └── pages/          # React pages
│   └── package.json        # Node dependencies
└── setup-laravel.*         # Setup scripts
```

## Support
If you encounter any issues:
1. Check the Laravel logs in `storage/logs/`
2. Check browser console for frontend errors
3. Verify database connection
4. Ensure all dependencies are installed
