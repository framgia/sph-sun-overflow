<?php

namespace App\GraphQL\Queries;

use App\Models\Answer;

final class Answers
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = Answer::query();
        if (isset($args['user_slug'])) {
            $query->whereRelation('user', 'slug', $args['user_slug']);
        }

        return $query;
    }
}
