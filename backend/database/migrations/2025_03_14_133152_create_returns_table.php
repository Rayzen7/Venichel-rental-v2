<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('returns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant')->constrained('users')->cascadeOnDelete();
            $table->foreignId('no_car')->constrained('rents')->cascadeOnDelete();
            $table->foreignId('id_penalties')->nullable()->constrained('penalties')->cascadeOnDelete();
            $table->string('date_borrow');
            $table->string('date_return');
            $table->string('discount');
            $table->string('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returns');
    }
};
