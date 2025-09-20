<?php

use App\Http\Controllers\Api\FormController;
use App\Http\Controllers\Api\SubmissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('forms', FormController::class);

Route::post('forms/{form}/submissions', [SubmissionController::class, 'store']);
Route::get('forms/{form}/submissions', [SubmissionController::class, 'index']);
Route::get('submissions/{submission}', [SubmissionController::class, 'show']);
