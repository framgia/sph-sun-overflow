<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserRelation>
 */
class UserRelationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $followerId = DB::table('users')->pluck('id')->random();
        $followingId = DB::table('users')
            ->whereNot('id', $followerId)
            ->pluck('id')
            ->random();

        return [
            'follower_id' => $followerId,
            'following_id' => $followingId,
        ];
    }
}
