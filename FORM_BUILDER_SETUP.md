# Form Builder - Complete Backend Setup

## 🎯 Project Overview
This is a complete Form Builder application built with Laravel 12 (backend) and React (frontend). The system allows admin users to create, edit, preview, and delete forms with multiple field types, and handles form submissions.

## 📋 Requirements Met

### ✅ Form Management (Admin UI)
- ✅ Create forms with name/title
- ✅ Add multiple fields to forms
- ✅ Supported field types: Text input, Text area, Checkbox, Radio
- ✅ Define options for checkbox and radio fields
- ✅ Configure required vs optional per field
- ✅ Save/update/delete forms
- ✅ Preview forms from builder

### ✅ Form Preview & Submission
- ✅ Preview page renders forms exactly as users see them
- ✅ Validations respect field requirements and type constraints
- ✅ Submit forms and persist submissions in backend
- ✅ Show success state on submission

### ✅ Submissions Management
- ✅ View all submissions for a form in admin UI
- ✅ Click submission to view detailed answers

## 🗄️ Database Structure

### Tables Created
1. **forms** - Stores form metadata
   - `id`, `title`, `description`, `created_at`, `updated_at`

2. **form_fields** - Stores form field configurations
   - `id`, `form_id`, `label`, `type`, `options`, `required`, `order`, `created_at`, `updated_at`

3. **form_submissions** - Stores form submissions
   - `id`, `form_id`, `ip_address`, `created_at`, `updated_at`

4. **submission_answers** - Stores individual field answers
   - `id`, `submission_id`, `field_id`, `answer`, `created_at`, `updated_at`

## 🚀 Quick Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js (for frontend)
- SQLite (default) or MySQL

### Backend Setup
```bash
cd backend

# Install dependencies
composer install

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed

# Start Laravel server
php artisan serve
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📡 API Endpoints

### Forms Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/forms` | Get all forms |
| POST | `/api/forms` | Create a new form |
| GET | `/api/forms/{id}` | Get a specific form |
| PUT | `/api/forms/{id}` | Update a form |
| DELETE | `/api/forms/{id}` | Delete a form |

### Form Submissions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/forms/{id}/submissions` | Get form submissions |
| POST | `/api/forms/{id}/submissions` | Submit a form |
| GET | `/api/submissions/{id}` | Get submission details |

## 📊 Sample Data

The seeder creates three sample forms matching your screenshots:

### 1. Contact Form
- Full Name (text, required)
- Email Address (text, required)
- Message (textarea, required)

### 2. Event Registration
- Participant Name (text, required)
- Email (text, required)
- Event Type (radio: Workshop, Conference, Seminar, Networking)
- Attendance Type (radio: In-person, Virtual)
- Dietary Restrictions (checkbox: Vegetarian, Vegan, Gluten-free, None)

### 3. Product Feedback
- Product Name (text, required)
- Rating (radio: 1, 2, 3, 4, 5)
- Feedback Type (checkbox: Bug Report, Feature Request, General Feedback, Complaint)
- Comments (textarea, optional)

## 🔧 Configuration

### Database Configuration
- Default: SQLite (`database/database.sqlite`)
- Can be changed to MySQL/PostgreSQL in `.env`

### CORS Configuration
- Configured to allow all origins for development
- Located in `config/cors.php`

### Authentication
- Laravel Fortify included for optional authentication
- Test user: `test@example.com` / `password`

## 🧪 Testing the API

### Test Forms Endpoint
```bash
curl http://localhost:8000/api/forms
```

### Test Form Creation
```bash
curl -X POST http://localhost:8000/api/forms \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Form",
    "description": "A test form",
    "fields": [
      {
        "label": "Name",
        "type": "text",
        "required": true,
        "order": 1
      }
    ]
  }'
```

### Test Form Submission
```bash
curl -X POST http://localhost:8000/api/forms/1/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "1": "John Doe",
      "2": "john@example.com",
      "3": "Hello, this is a test message."
    }
  }'
```

## 🔗 Frontend Integration

The React frontend is already configured to work with this Laravel backend:

- **API Service**: `frontend/src/services/api.ts`
- **TypeScript Types**: `frontend/src/types/form.ts`
- **Context**: `frontend/src/contexts/FormContext.tsx`
- **Pages**: Forms, FormBuilder, FormPreview, Submissions

## 📁 File Structure

```
backend/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── FormController.php
│   │   └── SubmissionController.php
│   └── Models/
│       ├── Form.php
│       ├── FormField.php
│       ├── FormSubmission.php
│       └── SubmissionAnswer.php
├── database/
│   ├── migrations/
│   │   ├── 2024_01_01_000001_create_forms_table.php
│   │   ├── 2024_01_01_000002_create_form_fields_table.php
│   │   ├── 2024_01_01_000003_create_form_submissions_table.php
│   │   └── 2024_01_01_000004_create_submission_answers_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── FormSeeder.php
├── routes/
│   └── api.php
└── config/
    └── cors.php
```

## 🎉 What's Working

After setup, you'll have:

1. **Complete Form Builder Backend** with Laravel 12
2. **RESTful API** for all form operations
3. **Database with Sample Data** matching your screenshots
4. **CORS Configuration** for frontend communication
5. **Validation** for form fields and submissions
6. **Type Safety** with proper Eloquent relationships

## 🚀 Next Steps

1. Run the setup commands above
2. Start both servers (Laravel: 8000, React: 5173)
3. Open your React app and see the forms loaded from the API
4. Test creating, editing, and submitting forms
5. View submissions in the admin interface

## 🐛 Troubleshooting

### Database Issues
- Ensure SQLite file is created: `touch database/database.sqlite`
- Check file permissions
- Run `php artisan migrate:fresh --seed` to reset

### CORS Issues
- Check `config/cors.php` configuration
- Verify frontend is running on correct port
- Check browser console for CORS errors

### API Issues
- Verify Laravel server is running on port 8000
- Check `routes/api.php` is included in `bootstrap/app.php`
- Test endpoints with curl or Postman

## 📝 Notes

- The system uses SQLite by default for easy setup
- All API responses follow Laravel conventions
- Form validation is handled server-side
- IP addresses are tracked for submissions
- The system is ready for production deployment

Your Form Builder backend is now complete and ready to integrate with your React frontend! 🎉
