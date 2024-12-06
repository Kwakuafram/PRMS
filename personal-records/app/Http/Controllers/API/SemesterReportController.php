<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\SemesterReport;
use App\Http\Controllers\Controller;

class SemesterReportController extends Controller
{
    public function show($studentId)
    {
        $reports = SemesterReport::where('student_id', $studentId)->with('grades.subject')->get();
        return response()->json($reports, 200);
    }
}