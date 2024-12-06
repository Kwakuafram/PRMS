<?php

namespace App\Http\Controllers\API;
use App\Models\Course;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class SubjectController extends Controller
{
    //
    public function getByCourse($courseId)
    {
        $subjects = Course::findOrFail($courseId)->subjects;
        return response()->json($subjects, 200);
    }
}
