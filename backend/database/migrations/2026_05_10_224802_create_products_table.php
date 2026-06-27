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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories');
            $table->string('name')->unique();
            $table->text('description');
            $table->text('short_description');
            $table->float('price');
            $table->float('discount_price');
            $table->integer('stock');
            $table->string('brand');
            $table->enum('status', ['active', 'inactive', 'out_of_stock'])->default('inactive');
            $table->boolean('is_featured');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
