<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subject extends Model
{
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function option()
    {
        return $this->belongsTo(Option::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }
}
