<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\StatisticsController;
use App\Http\Controllers\API\StaffController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', action: [UserController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);
Route::get('/statistics/students', [StatisticsController::class, 'getStudentCount']);
Route::get('/studentCount', [StudentController::class, 'getTotalCount']); // Get the total student count
Route::get('/staff', [StaffController::class, 'index']);
Route::post('/staff', [StaffController::class, 'store']);
Route::get('/staff/{id}', [StaffController::class, 'show']);
Route::put('/staff/{id}', [StaffController::class, 'update']);
Route::delete('/staff/{id}', [StaffController::class, 'destroy']);

Route::prefix('students')->group(function () {
    Route::get('/', [StudentController::class, 'index']); // Get all students
    Route::post('/', [StudentController::class, 'store']); // Create a new student
    Route::get('/{id}', [StudentController::class, 'show']); // Get a specific student by ID
    Route::put('/{id}', [StudentController::class, 'update']); // Update a student by ID
    Route::delete('/{id}', [StudentController::class, 'destroy']); // Delete a student by ID

   
});