<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Follow>
 */
class FollowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userId = DB::table('users')->pluck('id')->random();
        $follow_userID = DB::table('users')->pluck('id')->random();

        return [
            'user_id' => $userId,
            'follow_userID' => $follow_userID,
        ];
    }
}
