<?php

namespace App\GraphQL\Queries;

use App\Models\User as ModelsUser;

final class User
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return ModelsUser::where('slug', $args['slug'])->first();
    }
}
