<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = $this->faker->randomFloat(2, 100, 2000);

        $discountPrice = $this->faker->boolean(80)
            ? $this->faker->randomFloat(2, 50, $price - 10)
            : $price;

        return [
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'name' => $this->faker->unique()->words(3, true),
            'description' => $this->faker->paragraphs(3, true),
            'short_description' => $this->faker->sentence(),
            'price' => $price,
            'discount_price' => $discountPrice,
            'stock' => $this->faker->numberBetween(0, 150),
            'brand' => $this->faker->randomElement(['Apple', 'Samsung', 'Sony', 'Asus', 'Logitech', 'Dell', 'HP']),
            'status' => $this->faker->randomElement(ProductStatusEnum::cases()),
            'is_featured' => $this->faker->boolean(20),
        ];
    }
}
