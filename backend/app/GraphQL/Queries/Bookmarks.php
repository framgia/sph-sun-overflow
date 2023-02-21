<?php

namespace App\GraphQL\Queries;

use App\Models\User;
use Exception;

final class Bookmarks
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = User::find($args['user_id'])->bookmarks();

        try {
            if ($args['filter'] == 'Question') {
                $query->where('bookmarkable_type', 'App\Models\Question');
            }

            if ($args['filter'] == 'Answer') {
                $query->where('bookmarkable_type', 'App\Models\Answer');
            }

            return $query;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
