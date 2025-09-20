# Authentication Setup Guide

## Manual Setup Steps (Due to PHP Version Issue)

Since we have PHP 8.1 and Laravel requires 8.2+, here are the manual steps to set up authentication:

### 1. Create Admin User in Database

Run this SQL in your MySQL database:

```sql
USE form_builder;

-- Insert admin user (password is 'password')
INSERT INTO users (name, email, password, email_verified_at, created_at, updated_at) 
VALUES (
  'Admin User', 
  'admin@formforge.com', 
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  NOW(),
  NOW(),
  NOW()
);

-- Create personal_access_tokens table for Sanctum
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    abilities TEXT,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX personal_access_tokens_tokenable_type_tokenable_id_index (tokenable_type, tokenable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Test the Setup

1. **Start Laravel server**: `php artisan serve`
2. **Start React server**: `npm run dev` (in frontend folder)
3. **Visit**: http://localhost:5173
4. **Login with**:
   - Email: admin@formforge.com
   - Password: password

### 3. Features Added

✅ **Login Page** - Clean, modern interface
✅ **Protected Routes** - All admin pages require login
✅ **User Info** - Shows logged-in user in sidebar
✅ **Logout Button** - Easy logout functionality
✅ **Auto Token Management** - Automatic API authentication
✅ **Demo Credentials** - Shown on login page

### 4. What's Protected

All these routes now require authentication:
- `/` (Dashboard)
- `/forms` (Forms management)
- `/builder` (Form builder)
- `/submissions` (All submissions)
- `/submissions/:id` (Form-specific submissions)
- `/settings` (Settings)

### 5. API Endpoints

**Public:**
- POST `/api/auth/login` - Login
- POST `/api/auth/register` - Register (optional)

**Protected (require Bearer token):**
- GET `/api/auth/user` - Get current user
- POST `/api/auth/logout` - Logout
- All form management endpoints

The application now has complete authentication as requested in the specifications!
