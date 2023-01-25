<?php

namespace Database\Factories;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userId = DB::table('users')->pluck('id')->random();
        $voteableType = fake()->randomElement([Question::class, Answer::class]);
        $questionId = DB::table('questions')->pluck('id')->random();
        $answerId = DB::table('answers')->pluck('id')->random();

        return [
            'user_id' => $userId,
            'value' => fake()->randomElement([-1, 1]),
            'voteable_id' => ($voteableType == "Question") ?  $questionId : $answerId,
            'voteable_type' => $voteableType,

        ];
    }
}
