@echo off
echo ========================================
echo Form Builder Backend Setup
echo ========================================
echo.

cd backend

echo [1/5] Installing Composer dependencies...
composer install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Composer dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Generating application key...
php artisan key:generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate application key
    pause
    exit /b 1
)

echo.
echo [3/5] Running database migrations...
php artisan migrate
if %errorlevel% neq 0 (
    echo ERROR: Failed to run migrations
    pause
    exit /b 1
)

echo.
echo [4/5] Seeding database with sample data...
php artisan db:seed
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)

echo.
echo [5/5] Starting Laravel development server...
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo The API is now available at: http://localhost:8000
echo.
echo Sample forms created:
echo - Contact Form
echo - Event Registration  
echo - Product Feedback
echo.
echo Test the API:
echo curl http://localhost:8000/api/forms
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

php artisan serve
