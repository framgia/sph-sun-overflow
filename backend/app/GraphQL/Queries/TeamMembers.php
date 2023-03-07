<?php

namespace App\GraphQL\Queries;

use App\Exceptions\CustomException;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;

final class TeamMembers
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $user_id = Auth::id();
        $team = Team::where('slug', $args['team_slug'])->first();
        if (! $team) {
            throw new CustomException('No team found', 'No team with the specified slug found!');
        }
        if ($team->user_id != $user_id) {
            throw new CustomException('Invalid user', 'Please access as the Team Lead');
        }

        return $team->members();
    }
}
