<?php
namespace App\Http\Controllers\API;

use App\Models\Staff;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;



class StaffController extends Controller
{
    // Store a new staff record
    public function store(Request $request)
    {
        

        $staff = Staff::create([
            'full_name' => $request->full_name,
            'sex' => $request->sex,
            'staff_id' => $request->staff_id,
            'dob' => $request->dob,
            'first_pay_allowance' => $request->first_pay_allowance,
            'social_security' => $request->social_security,
            'ghana_card' => $request->ghana_card,
            'category' => $request->category,
            'rank_grade' => $request->rank_grade,
            'date_placed_on_rank' => $request->date_placed_on_rank,
            'highest_academic_qualification' => $request->highest_academic_qualification,
            'certificates' => $request->certificates,
            'date_posted_on_current_station' => $request->date_posted_on_current_station,
            'responsibility' => $request->responsibility,
            'salary_grade' => $request->salary_grade,
            'phone_number' => $request->phone_number,
            'email_address' => $request->email_address,
            'teacher_union' => $request->teacher_union,
        ]);
        return response()->json($staff, 201);

        
    }

    // Show all staff
    public function index()
    {
        $staff = Staff::all();
        return response()->json($staff);
    }

    // Show a single staff$staff
    public function show($id)
    {
        $staff = Staff::findOrFail($id);
        return response()->json($staff);
    }

    // Update staff$staff data
    public function update(Request $request, $id)
    {
        $staff = Staff::findOrFail($id);

        $staff->update($request->all());
        return response()->json($staff, 200);
    }

    // Delete a staff$staff record
    public function destroy($id)
    {
        $staff = Staff::findOrFail($id);
        $staff->delete();
        return response()->json(['message' => 'Staff deleted successfully']);
    }

    public function getTotalCount(): JsonResponse
    {
        $staffCount = Staff::count();
        return response()->json(['count' => $staffCount]);
    }
}

