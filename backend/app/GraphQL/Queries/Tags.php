<?php

namespace App\GraphQL\Queries;

use App\Models\Tag;
use Error;

final class Tags
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $filters = $args['filter'];

        $query = Tag::query()->withCount(['questions','usersWatching']);

        foreach($filters as $filter){

            $query->orderby($filter['column'], $filter['order']);

        }

        return $query;
    }
}
