<?php

namespace Database\Seeders;

use App\Enums\ProductStatusEnum;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create(
            [
                'id' => 1,
                'category_id' => 19,
                'name' => 'iphone',
                'description' => 'gg',
                'short_description' => 'short_description',
                'price' => 2000,
                'discount_price'=>1500,
                'stock' => 10,
                'brand' => 'apple',
                'status' => ProductStatusEnum::ACTIVE,
                'is_featured' => true
            ]
        );
    }
}
