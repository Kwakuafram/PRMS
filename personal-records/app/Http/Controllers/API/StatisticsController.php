<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Student;



class StatisticsController extends Controller
{
      // Method to get the total count of students
      public function getStudentCount(): JsonResponse
      {
          $studentCount = Student::count();
          return response()->json(['count' => $studentCount]);
      }
    }