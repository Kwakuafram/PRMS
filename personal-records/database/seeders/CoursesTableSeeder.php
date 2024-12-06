<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;


class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $courses = ['Science', 'Business','Visual and Preforming Arts',
        'Agriculture','Home Economics','General Arts',' Languages'];

        foreach ($courses as $course) {
            Course::create(['name' => $course]);
        }
    }
}
