<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Student;
use App\Models\student24;

class StatisticsController extends Controller
{
      // Method to get the total count of students
      public function getStudentCount(): JsonResponse
      {
          $studentCount = student24::count();

          $courseCount = Course::count();


          $totalMales = student24::where('gender', 'Male')->count();
          $totalFemales = student24::where('gender', 'Female')->count();
          
          $totalMaleDay = student24::where('gender', 'Male')->where('status', 'Day')->count();
          $totalFemaleDay = student24::where('gender', 'Female')->where('status', 'Day')->count();
          
          $totalMaleBoarding = student24::where('gender', 'Male')->where('status', 'Boarding')->count();
          $totalFemaleBoarding = student24::where('gender', 'Female')->where('status', 'Boarding')->count();
          
          return response()->json([
              'total_males' => $totalMales,
              'total_females' => $totalFemales,
              'total_male_day' => $totalMaleDay,
              'total_female_day' => $totalFemaleDay,
              'total_male_boarding' => $totalMaleBoarding,
              'total_female_boarding' => $totalFemaleBoarding,
              'count' => $studentCount,
              'course' => $courseCount,
          ]);

      }
    }