<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => ucfirst($this->faker->unique()->word() . '-' . $this->faker->numberBetween(100, 999)),
            'description' => $this->faker->sentence(12),
            'image' => $this->faker->imageUrl(640, 480, 'tech', true, 'category'),
        ];
    }
}
