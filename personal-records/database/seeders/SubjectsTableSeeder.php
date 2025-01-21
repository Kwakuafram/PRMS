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
            ['name' => 'Christian Religious Studies', 'is_core' => false, 'course_id' => 7, 'option_id' => 19], // Option ID 1
            ['name' => 'Economics', 'is_core' => false, 'course_id' => 7, 'option_id' => 19 ], // Option ID 1
            ['name' => 'French', 'is_core' => false, 'course_id' => 7, 'option_id' => 19], // Option ID 1
            ['name' => 'Ghanaian Language', 'is_core' => false, 'course_id' => 7, 'option_id' => 19], // Option ID 1
            ['name' => 'Literature in English', 'is_core' => false, 'course_id' => 7, 'option_id' => 19], // Option ID 1
            ['name' => 'Additional Mathematics', 'is_core' => false, 'course_id' => 7, 'option_id' => 20], // Option ID 2
            ['name' => 'Ghanaian Language', 'is_core' => false, 'course_id' => 7, 'option_id' => 20], // Option ID 2
            ['name' => 'Geography', 'is_core' => false, 'course_id' => 7, 'option_id' => 20], // Option ID 2
            ['name' => 'History', 'is_core' => false, 'course_id' => 7, 'option_id' => 20], // Option ID 3
            ['name' => 'Literature in English', 'is_core' => false, 'course_id' => 7, 'option_id' => 20], // Option ID 3
            // ['name' => 'Additional Mathematics', 'is_core' => false, 'course_id' => 6, 'option_id' => 17], // Option ID 3
            // ['name' => 'Ghanaian language', 'is_core' => false, 'course_id' => 6, 'option_id' => 17], // Option ID 3
            // ['name' => 'Geography', 'is_core' => false, 'course_id' => 6, 'option_id' => 17], // Option ID 3
            // ['name' => 'Computer Science', 'is_core' => false, 'course_id' => 6, 'option_id' => 17], // Option ID 3
            // ['name' => 'Music', 'is_core' => false, 'course_id' => 6, 'option_id' => 17], // Option ID 3
            // ['name' => 'Art and Design Studio', 'is_core' => false, 'course_id' => 6, 'option_id' => 18], // Option ID 3
            // ['name' => 'French', 'is_core' => false, 'course_id' => 6, 'option_id' => 18], // Option ID 3
            // ['name' => 'Ghanaian Language', 'is_core' => false, 'course_id' => 6, 'option_id' => 18], // Option ID 3
            // ['name' => 'History', 'is_core' => false, 'course_id' => 6, 'option_id' => 18], // Option ID 3
            // ['name' => 'Literature in English', 'is_core' => false, 'course_id' => 6, 'option_id' => 18], // Option ID 3


          
            
        ];

        foreach ($electiveSubjects as $elective) {
            Subject::create($elective);
        }
    }
}