<?php

namespace Database\Factories;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userId = DB::table('users')->pluck('id')->random();
        $commentableType = fake()->randomElement([Question::class, Answer::class]);
        $questionId = DB::table('questions')->pluck('id')->random();
        $answerId = DB::table('answers')->pluck('id')->random();

        return [
            'content' => fake()->paragraph(),
            'user_id' => $userId,
            'commentable_id' => ($commentableType == "Question") ?  $questionId : $answerId,
            'commentable_type' => $commentableType,

        ];
    }
}
