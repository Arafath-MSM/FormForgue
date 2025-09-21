# FormForgue - Professional Form Builder

A modern, full-stack form builder application built with React, TypeScript, Laravel, and SQLite. Create dynamic forms with drag-and-drop interface, field validation, and comprehensive submission management.

## 🚀 Features

- **Dynamic Form Builder**: Create forms with Text Input, Text Area, Checkbox, and Radio Button fields
- **Real-time Preview**: See your forms as you build them
- **Submission Management**: View and manage all form submissions
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui
- **Type Safety**: Full TypeScript support for better development experience
- **RESTful API**: Clean Laravel API with proper validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Hook Form** for form handling

### Backend
- **Laravel 11** with PHP 8.1+
- **SQLite** database (production-ready)
- **RESTful API** design
- **CORS** enabled for frontend communication
- **Eloquent ORM** for database operations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ and npm
- **PHP** 8.1+ and Composer
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd FormForgue
```

### 2. Backend Setup
```bash
cd backend

# Install PHP dependencies
composer install

# Generate application key
php artisan key:generate

# Run database migrations and seeders
php artisan migrate --seed

# Start the Laravel server
php artisan serve
```
The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be available at `http://localhost:8080`

## 📁 Project Structure

```
FormForgue/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/  # API Controllers
│   │   └── Models/               # Eloquent Models
│   ├── database/
│   │   ├── migrations/          # Database migrations
│   │   └── seeders/            # Database seeders
│   └── routes/api.php          # API routes
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── contexts/          # React contexts
│   │   ├── services/          # API service
│   │   └── types/             # TypeScript types
│   └── public/               # Static assets
└── Assets/                  # Project screenshots
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/forms` | Get all forms |
| POST | `/api/forms` | Create a new form |
| GET | `/api/forms/{id}` | Get specific form |
| PUT | `/api/forms/{id}` | Update form |
| DELETE | `/api/forms/{id}` | Delete form |
| GET | `/api/submissions` | Get all submissions |
| GET | `/api/forms/{id}/submissions` | Get form submissions |
| POST | `/api/forms/{id}/submissions` | Submit form |
| GET | `/api/submissions/{id}` | Get submission details |

## 🎨 Key Features

### Form Builder
- **4 Field Types**: Text Input, Text Area, Checkbox, Radio Button
- **Dynamic Options**: Add/remove options for checkbox and radio fields
- **Field Validation**: Required field support
- **Real-time Preview**: See changes as you build

### Submission Management
- **All Submissions View**: See submissions from all forms
- **Form-specific View**: Filter submissions by form
- **Search & Filter**: Find specific submissions quickly
- **Detailed View**: Complete submission data with field labels

### User Experience
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, professional interface
- **Loading States**: Smooth user experience
- **Error Handling**: Clear error messages

## 🔧 Development

### Backend Development
```bash
cd backend
php artisan serve
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend (already production-ready)
cd backend
php artisan config:cache
php artisan route:cache
```

## 📊 Database Schema

The application uses SQLite with the following main tables:
- **forms**: Store form metadata
- **form_fields**: Store form field configurations
- **form_submissions**: Store submission records
- **submission_answers**: Store individual field answers

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL`

### Backend (Heroku/Railway)
1. Deploy the `backend` folder
2. Set environment variables
3. Run migrations: `php artisan migrate --seed`

## 🎯 Sample Data

The application comes with pre-seeded sample forms:
1. **Contact Form** - Basic contact information
2. **Event Registration** - Event signup with multiple field types
3. **Product Feedback** - Customer feedback collection

## 🔍 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 License

This project is part of a technical assessment and is not intended for commercial use.

## 👨‍💻 Developer

Built as a technical assessment demonstrating full-stack development skills with modern technologies and best practices.

---

**FormForgue** - Professional Form Builder Application
