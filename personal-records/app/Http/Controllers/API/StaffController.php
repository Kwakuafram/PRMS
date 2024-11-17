<?php
namespace App\Http\Controllers\API;

use App\Models\Staff;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


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

        $validated = $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'sex' => 'sometimes|in:male,female',
            'staff_id' => 'sometimes|string|unique:staff,staff_id,' . $id,
            'dob' => 'sometimes|date',
            'first_pay_allowance' => 'nullable|numeric',
            'social_security' => 'sometimes|string|unique:staff,social_security,' . $id,
            'ghana_card' => 'sometimes|string|unique:staff,ghana_card,' . $id,
            'category' => 'sometimes|in:teaching,non_teaching',
            'rank_grade' => 'sometimes|string',
            'date_placed_on_rank' => 'nullable|date',
            'highest_academic_qualification' => 'sometimes|string',
            'certificates' => 'nullable|array',
            'date_posted_on_current_station' => 'nullable|date',
            'responsibility' => 'nullable|string',
            'salary_grade' => 'nullable|string',
            'phone_number' => 'sometimes|string|unique:staff,phone_number,' . $id,
            'email_address' => 'sometimes|email|unique:staff,email_address,' . $id,
            'teacher_union' => 'nullable|string',
        ]);

        $staff->update($validated);
        return response()->json($staff);
    }

    // Delete a staff$staff record
    public function destroy($id)
    {
        $staff = Staff::findOrFail($id);
        $staff->delete();
        return response()->json(['message' => 'Staff deleted successfully']);
    }
}

