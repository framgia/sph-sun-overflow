<?php

namespace App\GraphQL\Mutations;

use App\Exceptions\CustomException;
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

        if (auth()->user()->role->name != 'Admin') {
            throw new CustomException('You are not allowed to remove Team');
        }

        $team->delete();

        return $team;
    }
}
