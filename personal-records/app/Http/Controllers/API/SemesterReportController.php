<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\SemesterReport;
use App\Http\Controllers\Controller;


class SemesterReportController extends Controller
{  public function index()
    {
        $reports = SemesterReport::with('student24')->get();
        return response()->json($reports);
    }

    /**
     * Store a new semester report in the database.
     */
    public function store(Request $request)
    {
        $report = SemesterReport::create($request->all());
        return response()->json(['message' => 'Semester report created successfully.', 'data' => $report], 201);
    }

    /**
     * Display a specific semester report.
     */
    public function show($id)
    {
    
        $report = SemesterReport::with('student24')->where('student_id', $id)->get();
    
        if ($report->isEmpty()) {
            return response()->json(['message' => 'Semester report not found.'], 404);
        }
    
        return response()->json(['data' => $report]);
    }


    /**
     * Update a specific semester report.
     */
    public function update(Request $request, $id)
    {
        $report = SemesterReport::find($id);

        if (!$report) {
            return response()->json(['message' => 'Semester report not found.'], 404);
        }

        $report->update($request->all());
        return response()->json(['message' => 'Semester report updated successfully.', 'data' => $report]);
    }

    /**
     * Remove a specific semester report.
     */
    public function destroy($id)
    {
        $report = SemesterReport::find($id);

        if (!$report) {
            return response()->json(['message' => 'Semester report not found.'], 404);
        }

        $report->delete();
        return response()->json(['message' => 'Semester report deleted successfully.']);
    }
}