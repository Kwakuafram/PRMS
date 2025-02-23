<?php
// app/Models/Student.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student extends Model
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
    ];

   

    protected $table = 'students'; // Ensure this is the correct table name

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

}
