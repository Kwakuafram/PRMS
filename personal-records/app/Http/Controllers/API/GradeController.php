<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Http\Controllers\Controller;

class GradeController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|exists:students,id',
            'semester_report_id' => 'required|exists:semester_reports,id',
            'subject_id' => 'required|exists:subjects,id',
            'grade' => 'required|string|max:2',
        ]);

        $grade = Grade::create($validatedData);

        return response()->json(['message' => 'Grade recorded successfully!', 'grade' => $grade], 201);
    }
}
