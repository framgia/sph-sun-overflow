<?php

namespace Database\Factories;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookmark>
 */
class BookmarkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userId = DB::table('users')->pluck('id')->random();
        $bookmarkableType = fake()->randomElement([Question::class, Answer::class]);
        $questionId = DB::table('questions')->pluck('id')->random();
        $answerId = DB::table('answers')->pluck('id')->random();

        return [
            'user_id' => $userId,
            'bookmarkable_id' => ($bookmarkableType == "App\Models\Question") ?  $questionId : $answerId,
            'bookmarkable_type' => $bookmarkableType,
        ];
    }
}
