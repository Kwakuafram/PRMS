<?php

// app/Http/Controllers/API/StudentController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\student_24;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Storage;




class StudentController extends Controller
{
    public function index()
    {
        $students = student_24::with(['course', 'option'])->get();
        return response()->json($students);    }

    public function store(Request $request)
    {

        $data = $request->all();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('student_images', 'public');
            $data['image'] = $imagePath;
        }

        $student = student_24::create($data);

        return response()->json(['success' => true, 'data' => $student], 201);
 
    
        // Return JSON response for successful creation
    }

    public function show($id)
    {
        return student_24::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        // Fetch the student record by ID
        $student = student_24::findOrFail($id);
    
        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($student->image) {
                Storage::disk('public')->delete($student->image);
            }
    
            // Store the new image and update the data array
            $imagePath = $request->file('image')->store('student_images', 'public');
            $request->merge(['image' => $imagePath]);
        }
    
        // Update the student record
        $student->update($request->all());
    
        // Return a success response
        return response()->json(['success' => true, 'data' => $student], 200);
    }
    
    
    
    public function destroy($id)
    {
        $student = student_24::findOrFail($id);
        $student->delete();
        return response()->json(null, 204);
    }

    public function getTotalCount(): JsonResponse
    {
        $studentCount = student_24::count();
        return response()->json(['count' => $studentCount]);
    }


    public function getstudents()
    {
        // Fetch students with their related courses and options
       
        $studentsData = DB::table('student_24')
        ->join('courses', 'student_24.course_id', '=', 'courses.id') // Join with the courses table using course_id
        ->join('options', 'student_24.option_id', '=', 'options.id') // Join with the options table using option_id
        ->select(
            'student_24.name',         // Name from student_24
            'student_24.contact',      // Contact from student_24
            'student_24.gender',       // Gender from student_24
            'student_24.status',       // Status from student_24
            'student_24.house_number', // House Number from student_24
            'student_24.dob',          // Date of Birth from student_24
            'student_24.class',        // Class from student_24
            'courses.name as course_name', // Course name from the courses table
            'options.name as option_name' // Option name from the options table
        )
        ->get();

    // Return the data as a JSON response
    return response()->json([
        'success' => true,
        'data' => $studentsData,
    ]);
    }


    public function uploadImage(Request $request, $id)
    {
        $student = student_24::findOrFail($id); // Find the student by ID

        if ($request->hasFile('image')) {
            // Store the uploaded image
            $imagePath = $request->file('image')->store('student_images', 'public');

            // If the student already has an image, delete the old one
            if ($student->image) {
                Storage::disk('public')->delete($student->image);
            }

            // Update the student's image field
            $student->image = $imagePath;
            $student->save();

            return response()->json(['success' => true, 'data' => $student], 200);
        }

        return response()->json(['success' => false, 'message' => 'No image uploaded'], 400);
    }
}
