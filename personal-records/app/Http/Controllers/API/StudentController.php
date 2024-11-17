<?php

// app/Http/Controllers/API/StudentController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Http\JsonResponse;


class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function store(Request $request)
    {
        $student = Student::create([
            'name' => $request->name,
            'fathers_name' => $request->fathers_name,
            'house_number' => $request->house_number,
            'mothers_name' => $request->mothers_name,
            'contact' => $request->contact,
            'gender' => $request->gender,
            'status' => $request->status,
            'dob' => $request->dob,
        ]);
    
        // Return JSON response for successful creation
        return response()->json($student, 201);
    }

    public function show($id)
    {
        return Student::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $student->update($request->all());
        return response()->json($student, 200);
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return response()->json(null, 204);
    }

    public function getTotalCount(): JsonResponse
    {
        $studentCount = Student::count();
        return response()->json(['count' => $studentCount]);
    }
}
