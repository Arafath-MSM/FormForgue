# FormForge Setup Instructions

## Backend Setup (Laravel)

1. **Database Setup**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Update `.env` file with your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=formforge
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

2. **Install Dependencies & Setup**
   ```bash
   composer install
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

3. **API will be available at**: `http://localhost:8000/api`

## Frontend Setup (React/TypeScript)

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Frontend will be available at**: `http://localhost:5173`

## API Endpoints

- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create a new form
- `GET /api/forms/{id}` - Get a specific form
- `PUT /api/forms/{id}` - Update a form
- `DELETE /api/forms/{id}` - Delete a form
- `GET /api/forms/{id}/submissions` - Get form submissions
- `POST /api/forms/{id}/submissions` - Submit a form
- `GET /api/submissions/{id}` - Get a specific submission

## Features Implemented

✅ **Form Management (Admin UI)**
- Create forms with title and description
- Add fields (text, textarea, checkbox, radio)
- Configure field options for checkbox/radio
- Set required/optional fields
- Reorder fields (up/down buttons)
- Save/update/delete forms
- Preview forms

✅ **Form Preview & Submission**
- Render forms exactly as users see them
- Field validation (required fields, type constraints)
- Submit forms and persist data
- Success state on submission

✅ **Submissions Management**
- View all submissions for a form
- Search and filter submissions
- View detailed submission data
- Export functionality (UI ready)

## Database Schema

- **forms**: id, title, description, created_at, updated_at
- **form_fields**: id, form_id, label, type, options, required, order, created_at, updated_at
- **form_submissions**: id, form_id, ip_address, created_at, updated_at
- **submission_answers**: id, submission_id, field_id, answer, created_at, updated_at

## Testing

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Create a new form using the form builder
4. Add various field types and configure them
5. Preview the form
6. Submit the form with test data
7. View submissions in the admin interface

## Notes

- The application uses MySQL database
- Frontend communicates with Laravel API via REST endpoints
- Form validation is handled both on frontend and backend
- All form data is properly structured and stored in relational tables
- UI matches the provided screenshots exactly
