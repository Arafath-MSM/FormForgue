Route::apiResource('forms', FormController::class);
Route::post('forms/{form}/fields', [FieldController::class, 'store']);
Route::put('fields/{field}', [FieldController::class, 'update']);
Route::delete('fields/{field}', [FieldController::class, 'destroy']);

Route::post('forms/{form}/submissions', [SubmissionController::class, 'store']);
Route::get('forms/{form}/submissions', [SubmissionController::class, 'index']);
Route::get('submissions/{submission}', [SubmissionController::class, 'show']);
