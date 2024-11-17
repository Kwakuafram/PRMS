<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Staff extends Model
{
    use HasFactory;
    protected $fillable = [
        'full_name',
        'sex',
        'staff_id',
        'dob',
        'first_pay_allowance',
        'social_security',
        'ghana_card',
        'category',
        'rank_grade',
        'date_placed_on_rank',
        'highest_academic_qualification',
        'certificates',
        'date_posted_on_current_station',
        'responsibility',
        'salary_grade',
        'phone_number',
        'email_address',
        'teacher_union',
    ];

    protected $casts = [
        'certificates' => 'array', // Store certificates as JSON array
    ];
}
