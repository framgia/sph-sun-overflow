<?php

namespace App\GraphQL\Queries;

use App\Models\User;
use Exception;

final class Users
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $query = User::query();

        try {
            if (isset($args['keyword'])) {
                $keywordLikeness = '%' . $args['keyword'] . '%';

                $query->where(function ($queryLikeness) use ($keywordLikeness) {
                    $queryLikeness
                        ->where('first_name', 'like', $keywordLikeness)
                        ->orWhere('last_name', 'like', $keywordLikeness);
                });
            }

            if (isset($args['role_id']) && $args['role_id']) {
                $query->whereHas('role', function ($queryRole) use ($args) {
                    $queryRole->where('id', $args['role_id']);
                });
            }

            if (isset($args['reputation']) && $args['reputation']) {
                $query->orderBy('reputation', $args['reputation']);
            }

            return $query;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
