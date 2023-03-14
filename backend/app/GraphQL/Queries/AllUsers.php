<?php

namespace App\GraphQL\Queries;

use App\Models\Team;
use App\Models\User;

final class AllUsers
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $users = User::query();

        if (isset($args['keyword'])) {
            $keywordLikeness = '%'.$args['keyword'].'%';

            $users->where(function ($queryLikeness) use ($keywordLikeness) {
                $queryLikeness
                    ->where('first_name', 'like', $keywordLikeness)
                    ->orWhere('last_name', 'like', $keywordLikeness);
            });
        }

        if (isset($args['team'])) {
            $team = Team::find($args['team']);
            $users->where('id', '!=', $team->user_id);

            $users->whereDoesntHave('teams', function ($queryTeam) use ($args) {
                $queryTeam->where('team_id', $args['team']);
            });
        }

        return $users->orderBy('first_name', 'asc')->get();
    }
}
