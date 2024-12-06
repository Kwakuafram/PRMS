<?php
// app/Models/Student.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


class student_24 extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'fathers_name',
        'house_number',
        'mothers_name',
        'class',
        'contact',
        'gender',
        'status',
        'dob',
        'image',
        'course_id',
        'option_id',
    ];

   

    protected $table = 'student_24'; // Ensure this is the correct table name

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function option()
    {
        return $this->belongsTo(Option::class);
    }

    public function semesterReports()
    {
        return $this->hasMany(SemesterReport::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }

}
