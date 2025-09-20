# Backend Setup Instructions

## Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL/MariaDB
- Node.js (for frontend)

## Database Setup

1. **Create Database**
   ```sql
   CREATE DATABASE form_builder;
   ```

2. **Update Database Configuration**
   - Copy `.env.example` to `.env` (if it exists)
   - Update the database credentials in `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=form_builder
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

## Laravel Setup

1. **Install Dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

3. **Run Migrations**
   ```bash
   php artisan migrate
   ```

4. **Seed Database**
   ```bash
   php artisan db:seed
   ```

5. **Start Laravel Server**
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create a new form
- `GET /api/forms/{id}` - Get a specific form
- `PUT /api/forms/{id}` - Update a form
- `DELETE /api/forms/{id}` - Delete a form
- `GET /api/forms/{id}/submissions` - Get form submissions
- `POST /api/forms/{id}/submissions` - Submit a form

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Testing the Integration

1. Start both servers (Laravel on port 8000, React on port 5173)
2. Open the React app in your browser
3. The forms should load from the Laravel API
4. You can create, edit, and delete forms
5. Form submissions will be saved to the database
