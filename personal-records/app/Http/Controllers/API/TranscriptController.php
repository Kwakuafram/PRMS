<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\SemesterReport;
use App\Http\Controllers\Controller;

class TranscriptController extends Controller
{
    public function show($studentId)
    {
        $transcript = SemesterReport::where('student_id', $studentId)
            ->with(['grades.subject'])
            ->get();

        $summary = $transcript->map(function ($report) {
            return [
                'semester' => $report->semester,
                'gpa' => $report->gpa,
                'grades' => $report->grades->map(function ($grade) {
                    return [
                        'subject' => $grade->subject->name,
                        'grade' => $grade->grade,
                    ];
                }),
            ];
        });

        return response()->json($summary, 200);
    }
}
