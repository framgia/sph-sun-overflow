<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userId = DB::table('users')->pluck('id')->random();
        $questionId = DB::table('questions')
            ->whereNot('user_id', $userId)
            ->pluck('id')
            ->random();

        return [
            'content' => fake()->paragraph(),
            'user_id' => $userId,
            'question_id' => $questionId,
        ];
    }
}
