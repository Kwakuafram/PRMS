<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\StatisticsController;
use App\Http\Controllers\API\StaffController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\OptionController;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\GradeController;
use App\Http\Controllers\API\SemesterReportController;
use App\Http\Controllers\API\TranscriptController;





Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', action: [UserController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);
Route::get('/statisticsstudents', [StatisticsController::class, 'getStudentCount']);
Route::get('/studentCount', [StudentController::class, 'getTotalCount']); // Get the total student count
Route::get('/staff', [StaffController::class, 'index']);
Route::post('/staff', [StaffController::class, 'store']);
Route::get('/staff/{id}', [StaffController::class, 'show']);
Route::put('/staff/{id}', [StaffController::class, 'update']);
Route::delete('/staff/{id}', [StaffController::class, 'destroy']);
Route::get('/staffCount', [StaffController::class, 'getTotalCount']); // Get the total staff count
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/options', [OptionController::class, 'index']);
Route::get('/getstudents', [StudentController::class, 'getstudents']); // Get all students

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/subjects/{course}', [SubjectController::class, 'getByCourse']);
Route::post('/students', [StudentController::class, 'store']);
Route::post('/grades', [GradeController::class, 'store']);
Route::get('grade/{id}', [GradeController::class, 'show']);

Route::get('/semester-reports/{student}', [SemesterReportController::class, 'show']);
Route::get('/transcripts/{student}', [TranscriptController::class, 'show']);
Route::post('/student_24/{id}/upload-image', [StudentController::class, 'uploadImage']);
Route::get('getSubjectsByClass', [SubjectController::class, 'getSubjectsByClass']);

Route::get('/getCourse', [CourseController::class, 'getCourse']);


Route::get('semester-reports', [SemesterReportController::class, 'index']);
Route::get('semester-reports/{id}', [SemesterReportController::class, 'show']);
Route::post('semester-report-store', [SemesterReportController::class, 'store']);
Route::put('semester-report/{id}', [SemesterReportController::class, 'update']);
Route::delete('semester-report/{id}', [SemesterReportController::class, 'destroy']);


Route::prefix('student_24')->group(function () {
    Route::get('/', [StudentController::class, 'index']); // Get all students
    Route::post('/', [StudentController::class, 'store']); // Create a new student
    Route::get('/{id}', [StudentController::class, 'show']); // Get a specific student by ID
    Route::put('/{id}', [StudentController::class, 'update']); // Update a student by ID
    Route::delete('/{id}', [StudentController::class, 'destroy']); // Delete a student by ID

   
});