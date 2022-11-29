<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ArticlesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'context' => $this->faker->realText(rand(10, 15)),
            // 'article_image' => 'https://source.unsplash.com/random',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
