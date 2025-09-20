#!/bin/bash

echo "Setting up Laravel Backend for Form Builder..."

cd backend

echo ""
echo "1. Installing Composer dependencies..."
composer install

echo ""
echo "2. Generating application key..."
php artisan key:generate

echo ""
echo "3. Running database migrations..."
php artisan migrate

echo ""
echo "4. Seeding database with sample data..."
php artisan db:seed

echo ""
echo "5. Starting Laravel development server..."
echo "The API will be available at http://localhost:8000"
echo "Press Ctrl+C to stop the server"
php artisan serve
