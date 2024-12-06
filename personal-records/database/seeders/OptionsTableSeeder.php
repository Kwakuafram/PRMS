<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Option;

class OptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $options = [
            // Science Course Options
            ['name' => 'Option_1', 'course_id' => 1],
            ['name' => 'Option_2', 'course_id' => 1],
            ['name' => 'Option_3', 'course_id' => 1],

            
            // Business Course Options
            ['name' => 'Option_1', 'course_id' => 2],


             // Visual and perfoming arts Course Options
             ['name' => 'Option_1', 'course_id' => 3],
             ['name' => 'Option_2', 'course_id' => 3],
             ['name' => 'Option_3', 'course_id' => 3],


              // Agricultur Course Options
            ['name' => 'Option_1', 'course_id' => 4],
            ['name' => 'Option_2', 'course_id' => 4],
            ['name' => 'Option_3', 'course_id' => 4],


             // Home Econs Course Options
             ['name' => 'Option_1', 'course_id' => 5],
             ['name' => 'Option_2', 'course_id' => 5],
             ['name' => 'Option_3', 'course_id' => 5],
             ['name' => 'Option_4', 'course_id' => 5],


             // General Arts Course Options
             ['name' => 'Option_1', 'course_id' => 6],
             ['name' => 'Option_2', 'course_id' => 6],
             ['name' => 'Option_3', 'course_id' => 6],
             ['name' => 'Option_4', 'course_id' => 6],


             // Languages Course Options
             ['name' => 'Option_1', 'course_id' => 7],
             ['name' => 'Option_2', 'course_id' => 7],
             

 

 
        ];

        foreach ($options as $option) {
            Option::create($option);
        }
    }
}
