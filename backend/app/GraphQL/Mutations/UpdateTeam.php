<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
use App\Models\Team;
use App\Models\User;
use Exception;
use Illuminate\Support\Str;

final class UpdateTeam
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $team = Team::findOrFail($args['id']);

            $teamLeader = $team->user_id;

            $team->name = $args['name'];
            $team->description = $args['description'];
            $team->user_id = $args['user_id'];

            if ($team->isDirty('user_id')) {
                if (optional(User::find($team->user_id))->role_id == 2) {
                    $team->members()->where('user_id', $teamLeader)->delete();

                    $team->members()->create([
                        'user_id' => $team->user_id,
                        'team_id' => $team->id,
                    ]);
                } else {
                    return new CustomException('Invalid user ID.');
                }
            }

            if ($team->isClean()) {
                return new CustomException('No values to update.');
            }

            $team->save();

            return $team;
        } catch (Exception $e) {
            $message = $e->getMessage();
            if (Str::contains($message, 'No query results for model')) {
                return new CustomException('Invalid team ID.');
            } else {
                return new CustomException('An error has occured.');
            }
        }
    }
}
