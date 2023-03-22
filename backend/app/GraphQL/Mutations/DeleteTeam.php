<?php

namespace App\GraphQL\Mutations;

use App\Models\Team;

final class DeleteTeam
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $team = Team::find($args['id']);

        $team->delete();

        return $team;
    }
}
