<?php

namespace App\Http\Controllers\API;
use App\Models\Course;
use App\Models\student_24;
use App\Models\Option;
use App\Models\Subject;




use App\Http\Controllers\Controller;
use App\Models\student24;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    //
    public function getByCourse($courseId)
    {
        try {
            // Fetch the course with its options, subjects, and students
            $course = Course::with([
                'options.subjects' => function ($query) use ($courseId) {
                    $query->where('course_id', $courseId); // Filter subjects by course_id
                },
                'subjects' => function ($query) {
                    $query->whereNull('option_id'); // Get core subjects
                },
                'students' => function ($query) use ($courseId) {
                    $query->where('course_id', $courseId); // Filter students by course_id
                },
            ])->findOrFail($courseId);
    
            // Map response
            $response = [
                'id' => $course->id,
                'course_name' => $course->course_name,
                'description' => $course->description,
                'students' => $course->students->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'name' => $student->name,
                        'email' => $student->email,
                        'option_id' => $student->option_id,
                    ];
                }),
                'subjects' => $course->subjects->map(function ($subject) {
                    return [
                        'id' => $subject->id,
                        'name' => $subject->name,
                        'is_core' => $subject->is_core,
                    ];
                }),
                'options' => $course->options->map(function ($option) {
                    return [
                        'id' => $option->id,
                        'option_name' => $option->option_name,
                        'subjects' => $option->subjects->map(function ($subject) {
                            return [
                                'id' => $subject->id,
                                'name' => $subject->name,
                                'is_core' => $subject->is_core,
                            ];
                        }),
                    ];
                }),
            ];
    
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch course details.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getSubjectsByClass(Request $request)
    {
        $class = $request->query('class');
        
        if (!$class) {
            return response()->json(['error' => 'Class parameter is required.'], 400);
        }
    
        // Retrieve the first student with the specified class
        $student = student24::where('class', $class)->first();
        
        if (!$student) {
            return response()->json(['error' => 'No students found for the specified class.'], 404);
        }
    
        // Map the class to the course and option
        $course = Course::find($student->course_id); // Assuming `course_id` exists in `students_24`
        $option = Option::find($student->option_id); // Assuming `option_id` exists in `students_24`
        
        if (!$course || !$option) {
            return response()->json(['error' => 'No course or option found for the specified class.'], 404);
        }
    
        // Retrieve core subjects specifically related to the course and option
        $coreSubjects = Subject::where('course_id', $course->id)
                                ->whereNull('option_id') // Core subjects do not have an option_id
                                ->where('is_core', true)
                                ->get();
    
        // Retrieve non-core subjects specifically related to the course and option
        $nonCoreSubjects = Subject::where('course_id', $course->id)
                                  ->where('option_id', $option->id) // Non-core subjects have an associated option_id
                                  ->where('is_core', false)
                                  ->get();
    
        // Group the subjects
        $groupedSubjects = [
            'core_subjects' => $coreSubjects->map(function ($subject) {
                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'is_core' => $subject->is_core,
                ];
            }),
            'non_core_subjects' => $nonCoreSubjects->map(function ($subject) {
                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'is_core' => $subject->is_core,
                ];
            }),
        ];
    
        return response()->json(['data' => $groupedSubjects], 200);
    }
    
    
    
}
