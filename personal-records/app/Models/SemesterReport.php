<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class SemesterReport extends Model
{
    protected $table = 'semester_reports';

    protected $fillable = [
        'student_id',
        'semester',
        'conduct',
        'interest',
        'class_teacher_report',
        'attitude',
        'head_assist_report',
        'vacation',
        'year',
        'attendance',
        'position',
        'academic',
        'year',
    ];
    public function student24()
    {
        return $this->belongsTo(student24::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}