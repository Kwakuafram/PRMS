<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Http\Controllers\Controller;

class GradeController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        
        $grade = Grade::create($data);

        return response()->json(['message' => 'Grade recorded successfully!', 'grade' => $grade], 201);
    }

    public function show($id)
    {
    
        $grades = Grade::with('student24')->where('student_id', $id)->get();
    
        if ($grades->isEmpty()) {
            return response()->json(['message' => 'Grades not found.'], 404);
        }
    
        return response()->json(['data' => $grades]);
    }
}
