<?php

namespace App\Http\Controllers\API;

use App\Models\Course;
use App\Models\Subject;
use Illuminate\Support\Facades\Log; // Import Log facade
use Illuminate\Support\Facades\DB;

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

    public function getCourse()
    {
        try {
            $courses = DB::table('courses')
                ->leftJoin('options', 'courses.id', '=', 'options.course_id')
                ->leftJoin('subjects', function ($join) {
                    $join->on('subjects.course_id', '=', 'courses.id')
                         ->where(function ($query) {
                             $query->whereNull('subjects.option_id')
                                   ->orWhereColumn('subjects.option_id', '=', 'options.id');
                         });
                })
                ->select(
                    'courses.id as course_id',
                    'courses.course_name',
                    'courses.description',
                    'options.id as option_id',
                    'options.option_name',
                    'subjects.id as subject_id',
                    'subjects.name as subject_name',
                    'subjects.is_core'
                )
                ->get();
    
            // Group and structure the courses for API response
            $groupedCourses = $courses->groupBy('course_id')->map(function ($courseGroup) {
                $firstCourse = $courseGroup->first();
                return [
                    'id' => $firstCourse->course_id,
                    'course_name' => $firstCourse->course_name,
                    'description' => $firstCourse->description,
                    'subjects' => $courseGroup->filter(function ($subject) {
                        return $subject->option_id === null; // Subjects without options
                    })->map(function ($subject) {
                        return [
                            'id' => $subject->subject_id,
                            'name' => $subject->subject_name,
                            'is_core' => $subject->is_core,
                        ];
                    })->values(),
                    'options' => $courseGroup->filter(function ($option) {
                        return $option->option_id !== null; // Filter options
                    })->groupBy('option_id')->map(function ($optionGroup) {
                        $firstOption = $optionGroup->first();
                        return [
                            'id' => $firstOption->option_id,
                            'option_name' => $firstOption->option_name,
                            'subjects' => $optionGroup->map(function ($subject) {
                                return [
                                    'id' => $subject->subject_id,
                                    'name' => $subject->subject_name,
                                    'is_core' => $subject->is_core,
                                ];
                            })->values(),
                        ];
                    })->values(),
                ];
            })->values();
    
            return response()->json(['data' => $groupedCourses], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch courses.', 'error' => $e->getMessage()], 500);
        }
    }
    
        }
