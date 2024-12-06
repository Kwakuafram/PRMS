<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $coreSubjects = [
          
        ];

        // General Science is added only to non-Science courses
        // $nonScienceCoreSubjects = array_merge($coreSubjects, ['General Science']);

        $courses = [
        ];

        // Add core subjects for each course
        foreach ($courses as $courseId => $subjects) {
            foreach ($subjects as $subject) {
                Subject::create([
                    'name' => $subject,
                    'is_core' => true,
                    'course_id' => $courseId,
                    'option_id' => null, // Core subjects are not tied to specific options

                ]);
            }
        }

        // Add elective subjects for each course
        $electiveSubjects = [
            ['name' => 'Agriculture', 'is_core' => false, 'course_id' => 3, 'option_id' => 2], // Option ID 1
            ['name' => 'Food and Nutrition', 'is_core' => false, 'course_id' => 3, 'option_id' => 2 ], // Option ID 1
            // ['name' => 'Business Management', 'is_core' => false, 'course_id' => 3, 'option_id' => 1], // Option ID 1
            // ['name' => 'Economics', 'is_core' => false, 'course_id' => 3, 'option_id' => 1], // Option ID 1
            // ['name' => 'Government', 'is_core' => false, 'course_id' => 3, 'option_id' => 1], // Option ID 1
            // ['name' => 'Economics', 'is_core' => false, 'course_id' => 3, 'option_id' => 2], // Option ID 2
            // ['name' => 'History', 'is_core' => false, 'course_id' => 3, 'option_id' => 2], // Option ID 2
            // ['name' => 'Geography', 'is_core' => false, 'course_id' => 3, 'option_id' => 2], // Option ID 2
            ['name' => 'Management in Living', 'is_core' => false, 'course_id' => 3, 'option_id' => 2], // Option ID 3
            // ['name' => 'Art and Design Foundation', 'is_core' => false, 'course_id' => 3, 'option_id' => 3], // Option ID 3
            // ['name' => 'Food and Nutrition', 'is_core' => false, 'course_id' => 3, 'option_id' => 3], // Option ID 3


          
            
        ];

        foreach ($electiveSubjects as $elective) {
            Subject::create($elective);
        }
    }
}