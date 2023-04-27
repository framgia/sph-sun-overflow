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
        $user = Auth::user();
        $team = Team::where('slug', $args['team_slug'])->first();
        if (! $team) {
            throw new CustomException('No team found', 'No team with the specified slug found!');
        }

        return $team->members();
    }
}
