<?php

namespace App\Http\Controllers\API;

use App\Models\Option;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class OptionController extends Controller
{
    /**
     * Fetch all courses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Retrieve all courses from the database
        $courseId = $request->query('course_id');
        $options = Option::where('course_id', $courseId)->get();
        return response()->json($options);
    }
}
