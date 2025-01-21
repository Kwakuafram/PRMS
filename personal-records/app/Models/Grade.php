<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
            'student_id',
            'subject_id',
            'grade',
            'class_score',
            'exam_score'
    ];
    public function semesterReport()
    {
        return $this->belongsTo(SemesterReport::class);
    }

    public function student24()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}


