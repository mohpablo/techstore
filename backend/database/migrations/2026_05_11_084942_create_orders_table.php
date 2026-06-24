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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('address_id')->constrained()->cascadeOnDelete();
            $table->string('order_number');
            $table->float('subtotal');
            $table->float('shipping_fee');
            $table->float('discount');
            $table->float('total');
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'confirmed'])->default('pending');
            $table->date('estimated_delivery_date');
            $table->date('delivered_at')->nullable();
            $table->text('notes')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
