<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userIds = DB::table('users')->pluck('id');

        return [
            'title' => fake()->sentence(),
            'content' => fake()->paragraph(),
            'user_id' => fake()->randomElement($userIds),
        ];
    }
}
