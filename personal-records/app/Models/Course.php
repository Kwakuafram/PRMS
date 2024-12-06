<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    public function subjects()
{
    return $this->hasMany(Subject::class);
}

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
