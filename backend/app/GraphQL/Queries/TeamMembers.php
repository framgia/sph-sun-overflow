<?php

namespace App\GraphQL\Queries;

use App\Exceptions\CustomException;
use App\Models\Team;
use Exception;

final class TeamMembers
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            return Team::where('slug', $args['team_slug'])->firstOrFail()->members();
        } catch (Exception) {
            throw new CustomException('No team found', 'No team with the specified slug found!');
        }
    }
}
