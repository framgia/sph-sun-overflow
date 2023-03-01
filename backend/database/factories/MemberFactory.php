<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $userId = DB::table('users')->pluck('id')->random();
        $teamId = DB::table('teams')->pluck('id')->random();
        return [
                    'user_id' => $userId,
                    'team_role_id' => random_int(2, 3),
                    'team_id' => $teamId,
        ];
    }
}
