<?php

namespace App\GraphQL\Queries;

use App\Models\Tag;

final class Tags
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = Tag::query();

        if (! isset($args['sort'])) {
            return $query;
        }

        $sorts = $args['sort'];

        $query->withCount(['questions', 'usersWatching']);

        foreach ($sorts as $sort) {
            $query->orderby($sort['column'], $sort['order']);
        }

        return $query;
    }
}
