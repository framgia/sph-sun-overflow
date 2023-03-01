<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userId = DB::table('users')->pluck('id')->random();

        return [
            'name' => fake()->company(),
            'description' => fake()->bs(),
            'dashboard_content' => '<p>'.fake()->paragraph($nbSentences = 1, $variableNbSentences = true).'</p>',
            'user_id' => $userId,
        ];
    }
}
