<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTable extends Migration
{
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->enum('sex', ['male', 'female']);
            $table->string('staff_id')->unique();
            $table->date('dob');  // Date of birth
            $table->decimal('first_pay_allowance', 10, 2)->nullable();
            $table->string('social_security')->unique();
            $table->string('ghana_card')->unique();
            $table->enum('category', ['teaching', 'non_teaching']);
            $table->string('rank_grade');
            $table->date('date_placed_on_rank')->nullable();
            $table->string('highest_academic_qualification');
            $table->json('certificates')->nullable(); // Store certificates as JSON array
            $table->date('date_posted_on_current_station')->nullable();
            $table->string('responsibility')->nullable();
            $table->string('salary_grade')->nullable();
            $table->string('phone_number')->unique();
            $table->string('email_address')->unique();
            $table->string('teacher_union')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('staff');
    }
}

