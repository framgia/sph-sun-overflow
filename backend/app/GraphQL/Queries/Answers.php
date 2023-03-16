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
        if (isset($args['user_id'])) {
            $query->where('user_id', $args['user_id'])->get();
        }

        return $query;
    }
}
