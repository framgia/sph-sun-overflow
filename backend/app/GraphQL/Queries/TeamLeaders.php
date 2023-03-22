<?php

namespace App\GraphQL\Queries;

use App\Models\User;

final class TeamLeaders
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return User::where('role_id', 2)->get();
    }
}
