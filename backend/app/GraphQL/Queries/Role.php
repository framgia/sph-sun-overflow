<?php

namespace App\GraphQL\Queries;

use App\Models\Role as ModelsRole;

final class Role
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return ModelsRole::where('slug', $args['slug'])->first();
    }
}
