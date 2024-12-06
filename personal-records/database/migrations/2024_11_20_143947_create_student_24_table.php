<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudent24Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_24', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('fathers_name');
            $table->string('mothers_name');
            $table->string('house_number');
            $table->string('class');
            $table->string('contact');
            $table->enum('gender', ['male', 'female']);
            $table->enum('status', ['day', 'boarding'])->default('boarding');
            $table->date('dob'); // Date of Birth
            $table->string('image')->nullable(); // Nullable image field
            $table->foreignId('course_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('option_id')->nullable()->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_24');
    }
}
