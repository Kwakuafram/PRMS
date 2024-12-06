<?php

namespace App\Http\Controllers\API;

use App\Models\Course;
use App\Models\Subject;
use Illuminate\Support\Facades\Log; // Import Log facade

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;



class CourseController extends Controller
{
    /**
     * Fetch all courses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($courseId, $optionId = null)
    {
        $course = Course::all();
        return response()->json($course);
    }
}