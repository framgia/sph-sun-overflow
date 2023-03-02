<?php

namespace App\GraphQL\Queries;

use App\Models\Team as ModelsTeam;

final class Team
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return ModelsTeam::where('slug', $args['slug'])->first();
    }
}
