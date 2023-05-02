<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Member;
use App\Models\Team;
use App\Models\User;
use Exception;
use Illuminate\Support\Str;

final class CreateTeam
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $user = User::findOrFail($args['user_id']);

            $team = Team::create([
                'name' => $args['name'],
                'description' => $args['description'],
                'user_id' => $user->id,
            ]);

            return $team;
        } catch (Exception $e) {
            $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return new CustomException('Invalid user ID.');
            } else {
                return new CustomException('An error has occured.');
            }
        }
    }
}
